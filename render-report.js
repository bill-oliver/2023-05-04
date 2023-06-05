//
//  Creates or updates posts in Publii db from report data in report.db
//
//  title: classification Number (changed later)
//  slug:  classification Number
//  text: Report post
//  remainning fields are cloned from post record with slug == "reference"
//
//  post_additional_data records are created from the reference post.
//
//  Optional: can create individual markdown files
//

"use strict";

var fs = require('fs');

const bUpdateExisting = true;  // Set to false to generate new records

//
//  dataFields structure: Cross references fields in database with tokens in Report
//
const dataFields = {
	tokens : [
		"HHCC Accession No.",
		" +HHCC Classification Code:",
		"Last Modified:",
		"Group:",
		"Description:",
		"Film Image:",
		"Digital Image:",
		"Make:",
		"Manufacturer:",
		"Model:",
		"Serial No.:",
		"Size:",
		"Weight:",
		"Circa:",
		"Rating:",
		"Patent Date/Number:",
		"Provenance:",
		"Type and Design:",
		"Construction:",
		"Material:",
		"Special Features:",
		"Accessories",
		"Capacities:",
		"Performance Characteristics:",
		"Operation:",
		"Control and Regulation:",
		"Targeted Market Segment:",
		"Consumer Acceptance:",
		"Merchandising:",
		"Market Price:",
		"Technological Significance:",
		"Industrial Significance:",
		"Socio-economic Significance:",
		"Socio-cultural Significance:",
		"Donor:",
		"HHCC Storage Location:",
		"Tracking:",
		"Bibliographic References:",
		"Notes:",
		"Related Reports",
		"\f" ],
	fields : [
		"AccessionNo",
		"Classification",
		"LastModified",
		"Grp",
		"Description",
		"FilmImage",
		"DigitalImage",
		"Make",
		"Manufacturer",
		"Model",
		"SerialNo",
		"Size",
		"Weight",
		"Circa",
		"Rating",
		"PatentDateNumber",
		"Provenance",
		"TypeandDesign",
		"Construction",
		"Material",
		"SpecialFeatures",
		"Accessories",
		"Capacities",
		"PerformanceCharacteristics",
		"Operation",
		"ControlandRegulation",
		"TargetedMarketSegment",
		"ConsumerAcceptance",
		"Merchandising",
		"MarketPrice",
		"TechSignificance",
		"IndSignificance",
		"EconSignificance",
		"CultSignificance",
		"Donor",
		"StorageLocation",
		"Tracking",
		"BiblioRef",
		"Notes",
		"RelatedReports",
		"" ]
}


//
//  updatePost - function
//  ----------
//
//  Updates the post in the publii db for a reserch report 
//
//  sClass - Classification Code (page slug)
//  sPage - page text in Markdown
// 
function updatePost( sClass, sPage ){
	var dbPublii = new sqlite3.Database('db.sqlite');  // Publii database  (make a copy!!!)

	dbPublii.configure( "busyTimeout", 20000 );  // Keep SQLite from timing out

	dbPublii.run( "UPDATE posts SET text = ? WHERE slug = ?;",
	              [ sPage, sClass ], ( err ) => {
		if( err )
			throw err;
		else { 
			console.log( sClass, "updated" );
		}
	});
}

//
//  addPost - function
//  -------
//
//  Creates a new post in the publii db for a reserch report 
//
//  sClass - Classification Code (used as page title and slug)
//  sPage - page text in Markdown
// 
function addPost( sClass, sPage ){
	var dbPublii = new sqlite3.Database('db.sqlite');  // Publii database  (make a copy!!!)

	var sSQLPost = "INSERT INTO posts( title, authors, slug, text, created_at, modified_at, status, template ) " +
								"VALUES( ?, ?, ?, ?, ?, ?, ?, ? );"
	var sSQLAdditional = "INSERT INTO posts_additional_data( post_id, key, value ) " +
											"VALUES( ?, ?, ? );"

	dbPublii.configure( "busyTimeout", 20000 );  // Keep SQLite from timing out
	
	//
	// Get reference data from the reference post we are cloning
	//
	dbPublii.get( "SELECT DISTINCT * FROM posts WHERE slug = 'reference'", 
								[], ( err, postRef ) => {
		if( err )
			throw err;
	  else{
			dbPublii.get( "SELECT DISTINCT * FROM posts_additional_data "+
										"WHERE post_ID = '" + postRef.id + "' " +
										"AND key = '_core'", 
										[], ( err, coreRef ) => {
				if( err )
					throw err;
				else{
					dbPublii.get( "SELECT DISTINCT * FROM posts_additional_data "+
												"WHERE post_ID = '" + postRef.id + "' " +
												"AND key = 'postViewSettings'", 
												[], ( err, viewRef ) => {
						if( err )
							throw err;
						else{
							// console.log( "**** Reference" );
							// console.log( postRef );
							// console.log( coreRef );
							// console.log( viewRef );
							
							//
							//  Add the new post to the posts table
							//
							dbPublii.run( sSQLPost, 
													[ sClass,  						// title
														postRef.authors,    // copy author from reference
														sClass,  						// slug
														sPage,							// text
														postRef.created_at,		// copy from reference
														postRef.modified_at,	// copy from reference
														postRef.status,				// copy from reference
														"" ],								// template is empty
														function ( err ) {  // need to use this syntax to access "this"
								if( err )
									throw err;
								else{
									console.log( "new post id:", this.lastID );
									
									//
									//  Add the additional post data to posts_additional_data
									//
									dbPublii.serialize();									
									dbPublii.run( sSQLAdditional, 
															[ this.lastID,				// ID from post we just added
																coreRef.key,				// copy from reference
																coreRef.value ] );	// copy from reference
									dbPublii.run( sSQLAdditional, 
															[ this.lastID,				// ID from post we just added
																viewRef.key,				// copy from reference
																viewRef.value ] );	// copy from reference
									dbPublii.parallelize();
								}
							})
						}
					})
				}
			})
		}
	})
	
	// dbPublii.close();
}

//
//  insertGallery - function
//  -------------
//
//  Returns the html text to build a gallery containing the images.
//  No gallery is created if there is only 1 image.
//
//  Gallery code taken from html file created by wsw editor
//
//    ImagesFiles - Array with image information
//
function insertGallery( ImageFiles ){
	let iImages = ImageFiles.length;
	let sRet = "";

	if( iImages > 1 ){
		//
		//  Insert the drop down details block heading
		//
		sRet = "\n\n<details>\n	<summary><b>Image Gallery (" + iImages + " Images)</b></summary>\n";

		//
		//  Start the Gallery
		//
		sRet += '<div class="gallery gallery-wrapper--full" contenteditable="false" '
			+  'data-is-empty="false" data-translation="Add images" data-columns="6">\n';

		//
		// Add the images
		//
		for( let i = 0; i < iImages; i++ ){
			let sFN = ImageFiles[i].get( "Fn" );
			let iHt = ImageFiles[i].get( "Ht" );
			let iWd = ImageFiles[i].get( "Wd" );
			let sNoType = sFN.slice( 0, sFN.lastIndexOf(".") );
			sRet += '<figure class="gallery__item"><a href="#DOMAIN_NAME#gallery/' + sFN 
				+ '" data-size="' + iWd + "x" + iHt + '">' 
				+ '<img src="#DOMAIN_NAME#gallery/' + sNoType + '-thumbnail.jpg" alt=""></a></figure>\n'; 
		}

		sRet += "</div>\n";      	// Close the Gallery
		sRet += "</details>\n\n";   	// End the details block
	}

	return sRet;
}

//
//  renderPage - function
//  ----------
//
//  Builds the Markdown Research Report web page in a global string
//
//    m - Map containing the fields and the associated text 
//    imgs - array of image data associated with this object
//  (populated by buildMap function)
//
var sPage;                    //  Global string buffer for the rendered page

function renderPage( m, imgs ){

	const sHead = "##### ";   // Use heading level 5 for section headers

	let sClassification = m.get( "Classification" );
	
	sPage = 
		// "<div align='center'>Research Reports</div>\n" +
		// "<div align='center'>Founding Collection, HVACR Heritage Centre Canada</div>\n" +
		// "<div align='center'>The Artifacts of HVACR Technology, Canada’s First Half Century</div>\n\n" +
		"| **HHCC Accession No. " + m.get( "AccessionNo" ) + 
		"** |**HHCC Classification Code:  " + m.get( "Classification" ) + "**|\n" +
		"| ----------- | ----------- |\n" +
		sHead + "Description:\n" + m.get( "Description" ) + "\n" +
		"\n---\n" +

		insertGallery( imgs ) +									// Optional gallery goes here

		sHead + "Group:\n" + m.get( "Grp" ) + "\n\n" +
		// sHead + "Last Modified:\n" + m.get( "LastModified" ) + "\n\n" +
		// sHead + "Film Image:\n" + m.get( "FilmImage"  ) + "\n\n" +
		// sHead + "Digital Image:\n" + m.get( "DigitalImage"  ) + "\n\n" +
		sHead + "Make:\n" + m.get( "Make"  ) + "\n\n" +
		sHead + "Manufacturer:\n" + m.get( "Manufacturer"  ) + "\n\n" +
		sHead + "Model:\n" + m.get( "Model"  ) + "\n\n" +
		sHead + "Serial No.:\n" + m.get( "SerialNo"  ) + "\n\n" +
		sHead + "Size:\n" + m.get( "Size"  ) + "\n\n" +
		sHead + "Weight:\n" + m.get( "Weight"  ) + "\n\n" +
		sHead + "Circa:\n" + m.get( "Circa"  ) + "\n\n" +
		sHead + "Rating:\n" + m.get( "Rating"  ) + "\n\n" +
		sHead + "Patent Date/Number:\n" + m.get( "PatentDateNumber"  ) + "\n\n" +
		sHead + "Provenance:\n" + m.get( "Provenance"  ) + "\n\n" +
		sHead + "Type and Design:\n" + m.get( "TypeandDesign"  ) + "\n\n" +
		sHead + "Construction:\n" + m.get( "Construction"  ) + "\n\n" +
		sHead + "Material:\n" + m.get( "Material"  ) + "\n\n" +
		sHead + "Special Features:\n" + m.get( "SpecialFeatures"  ) + "\n\n" +
		sHead + "Accessories:\n" + m.get( "Accessories"  ) + "\n\n" +
		sHead + "Capacities:\n" + m.get( "Capacities"  ) + "\n\n" +
		sHead + "Performance Characteristics:\n" + m.get( "PerformanceCharacteristics"  ) + "\n\n" +
		sHead + "Operation:\n" + m.get( "Operation"  ) + "\n\n" +
		sHead + "Control and Regulation:\n" + m.get( "ControlandRegulation"  ) + "\n\n" +
		sHead + "Targeted Market Segment:\n" + m.get( "TargetedMarketSegment"  ) + "\n\n" +
		sHead + "Consumer Acceptance:\n" + m.get( "ConsumerAcceptance"  ) + "\n\n" +
		sHead + "Merchandising:\n" + m.get( "Merchandising"  ) + "\n\n" +
		sHead + "Market Price:\n" + m.get( "MarketPrice"  ) + "\n\n" +
		sHead + "Technological Significance:\n" + m.get( "TechSignificance"  ) + "\n\n" +
		sHead + "Industrial Significance:\n" + m.get( "IndSignificance"  ) + "\n\n" +
		sHead + "Socio-economic Significance:\n" + m.get( "EconSignificance"  ) + "\n\n" +
		sHead + "Socio-cultural Significance:\n" + m.get( "CultSignificance"  ) + "\n\n" +
		sHead + "Donor:\n" + m.get( "Donor"  ) + "\n\n" +
		sHead + "HHCC Storage Location:\n" + m.get( "StorageLocation"  ) + "\n\n" +
		sHead + "Tracking:\n" + m.get( "Tracking"  ) + "\n\n" +
		sHead + "Bibliographic References:\n" + m.get( "BiblioRef"  ) + "\n\n" +
		sHead + "Notes:\n" + m.get( "Notes"  ) + "\n\n" +
		sHead + "Related Reports:\n" + m.get( "RelatedReports") + "\n";

	// console.log( sPage );
	// fs.writeFileSync( ".\\markdown\\" + m.get( "AccessionNo" ) + ".md", sPage );		// For Testing
	if( bUpdateExisting ){
		updatePost( m.get( "Classification" ), sPage );  // Update existing record
	} 
	else{
		addPost( m.get( "Classification" ), sPage );	// Add new record
	}
}


//  buildMap - function
//  --------
//
//  Builds a map of the text fields from the database
//
//  This *seems* like the only way to do this based on the parallel db operation
//  Caution with the use of variable i if they don't execute in sequence...
//
function buildMap( sAccNo ){
	
	let db2 = new sqlite3.Database('reports.sqlite');

	function makeSQL( sField ){           // Local helper function
		let sSQL = "SELECT DISTINCT " + sField + " AS slice FROM report " +
					 " WHERE AccessionNo = '" + sAccNo + "';";
					 // " WHERE AccessionNo = " + "'2003.020';";
		return sSQL;
	}

	var mapSlices = new Map();    // Map will contain the slice of text for each field
	var i = 0;
	
	if( dataFields.fields.length != 41 ){
		throw new Error( "function buildMap assumes exactly"
											+ dataFields.fields.length + " fields to process" );
	}
											
	db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
		mapSlices.set( dataFields.fields[i++], row.slice );
		db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
			mapSlices.set( dataFields.fields[i++], row.slice );
			db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
				mapSlices.set( dataFields.fields[i++], row.slice );
				db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
					mapSlices.set( dataFields.fields[i++], row.slice );
					db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
						mapSlices.set( dataFields.fields[i++], row.slice );
						db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
							mapSlices.set( dataFields.fields[i++], row.slice );
							db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
								mapSlices.set( dataFields.fields[i++], row.slice );
								db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
									mapSlices.set( dataFields.fields[i++], row.slice );
									db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
										mapSlices.set( dataFields.fields[i++], row.slice );
										db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
											mapSlices.set( dataFields.fields[i++], row.slice );
											db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
												mapSlices.set( dataFields.fields[i++], row.slice );
												db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
													mapSlices.set( dataFields.fields[i++], row.slice );
													db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
														mapSlices.set( dataFields.fields[i++], row.slice );
														db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
															mapSlices.set( dataFields.fields[i++], row.slice );
															db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																mapSlices.set( dataFields.fields[i++], row.slice );
																db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																	mapSlices.set( dataFields.fields[i++], row.slice );
																	db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																		mapSlices.set( dataFields.fields[i++], row.slice );
																		db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																			mapSlices.set( dataFields.fields[i++], row.slice );
																			db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																				mapSlices.set( dataFields.fields[i++], row.slice );
																				db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																					mapSlices.set( dataFields.fields[i++], row.slice );
																					db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																						mapSlices.set( dataFields.fields[i++], row.slice );
																						db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																							mapSlices.set( dataFields.fields[i++], row.slice );
																							db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																								mapSlices.set( dataFields.fields[i++], row.slice );
																								db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																									mapSlices.set( dataFields.fields[i++], row.slice );
																									db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																										mapSlices.set( dataFields.fields[i++], row.slice );
																										db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																											mapSlices.set( dataFields.fields[i++], row.slice );
																											db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																												mapSlices.set( dataFields.fields[i++], row.slice );
																												db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																													mapSlices.set( dataFields.fields[i++], row.slice );
																													db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																														mapSlices.set( dataFields.fields[i++], row.slice );
																														db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																															mapSlices.set( dataFields.fields[i++], row.slice );
																															db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																mapSlices.set( dataFields.fields[i++], row.slice );
																																db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																	mapSlices.set( dataFields.fields[i++], row.slice );
																																	db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																		mapSlices.set( dataFields.fields[i++], row.slice );
																																		db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																			mapSlices.set( dataFields.fields[i++], row.slice );
																																			db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																				mapSlices.set( dataFields.fields[i++], row.slice );
																																				db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																					mapSlices.set( dataFields.fields[i++], row.slice );
																																					db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																						mapSlices.set( dataFields.fields[i++], row.slice );
																																						db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																							mapSlices.set( dataFields.fields[i++], row.slice );
																																							db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																								mapSlices.set( dataFields.fields[i++], row.slice );
																																								db2.get( makeSQL( dataFields.fields[i] ), [], (err, row) => {
																																									mapSlices.set( dataFields.fields[i++], row.slice );
																																								});
																																							});
																																						});
																																					});
																																				});
																																			});
																																		});
																																	});
																																});
																															});
																														});
																													});
																												});
																											});
																										});
																									});
																								});
																							});
																						});
																					});
																				});
																			});
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
	

	//
	//  Add the list of image information
	//
	var Images = [];			// Array  to store the images in

	const sSQLImages = "SELECT ALL ImageFile,Width,Height FROM report CROSS JOIN Images WHERE Images.ReportID=report.ID AND report.AccessionNo = (?);"
	db2.all( sSQLImages, [sAccNo], (err, rows ) => {
		for( let i=0; i<rows.length; i++ ){
			let ImgInf = new Map( [
								[ "Fn", rows[i].ImageFile ],
								[ "Ht", rows[i].Height ],
								[ "Wd", rows[i].Width ]
								]);

			Images[i]=ImgInf;
		}
		mapSlices.set( "ImageFiles", Images );
	} );

	//
	//  Must wait for the close to complete before we can access the Data
	//
	db2.close((err) => {
	  if (err)
			console.log(err.message);
	  else{
			// console.log('Close the database2 connection.');
			// console.log( "mapSlices", mapSlices );
			renderPage( mapSlices, Images );
			// test( mapSlices );
	  }
	});
}
	
//
//  dbCallback - function
//  ----------
//
//  Callback for Database.each function
//
function dbCallback( err, row ){
	if( err ){
		throw err;
	}
	// renderPage( db, row );
	buildMap( row.AccessionNo );
}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('reports.sqlite')
let sql = "SELECT * FROM report";
// let sql = "SELECT * FROM report WHERE AccessionNo = '2003.051'";  	// For Testing
// let sql = "SELECT * FROM report WHERE AccessionNo = '2003.001'";


try {
	// db.serialize();
	db.each( sql, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close( );

