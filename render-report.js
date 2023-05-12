"use strict";

var fs = require('fs');

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

function getSlice( db, sAccessionNo, sField ){
	let i = dataFields.fields.indexOf( sField );
	
	if( i < 0 ){
		throw( new Error( "Field " + sField + " not found in array" ) );
	}
	
	let sSQL = "SELECT DISTINCT " + sField + " AS slice FROM report " +
			   " WHERE AccessionNo = '" + sAccessionNo + "';";
	
	db.get( sSQL, [], (err, row) => {
		if (err) {
			throw( err );
		}
		console.log( row );
	})


	return "@@@@";
}

var sPage;
//
//  renderPage - function
//  ----------
//
function renderPage( db, row ){
	// db.serialize();
	
	const sHead = "######";
	sPage = 
		"<div align='center'>Research Reports</div>\n" +
		"<div align='center'>Founding Collection, HVACR Heritage Centre Canada</div>\n" +
		"<div align='center'>The Artifacts of HVACR Technology, Canada’s First Half Century</div>\n\n" +
		"| **HHCC Accession No. " + row.AccessionNo + 
		"** |**HHCC Classification Code:  " + row.Classification + "**|\n" +
		"| ----------- | ----------- |\n\n" +
		
		sHead + "Last Modified:  " + getSlice( db, row.AccessionNo, "LastModified" ) + "\n\n" +
		sHead + "\n" + getSlice( db, row.AccessionNo, "Grp" ) + "\n\n" +
		sHead + "\n" + getSlice( db, row.AccessionNo, "Description" ) + "\n\n" +
		// sHead + "\n" + getSlice( "FilmImage",
		// sHead + "\n" + getSlice( "DigitalImage",
		// sHead + "\n" + getSlice( "Make",
		// sHead + "\n" + getSlice( "Manufacturer",
		// sHead + "\n" + getSlice( "Model",
		// sHead + "\n" + getSlice( "SerialNo",
		// sHead + "\n" + getSlice( "Size",
		// sHead + "\n" + getSlice( "Weight",
		// sHead + "\n" + getSlice( "Circa",
		// sHead + "\n" + getSlice( "Rating",
		// sHead + "\n" + getSlice( "PatentDateNumber",
		// sHead + "\n" + getSlice( "Provenance",
		// sHead + "\n" + getSlice( "TypeandDesign",
		// sHead + "\n" + getSlice( "Construction",
		// sHead + "\n" + getSlice( "Material",
		// sHead + "\n" + getSlice( "SpecialFeatures",
		// sHead + "\n" + getSlice( "Accessories",
		// sHead + "\n" + getSlice( "Capacities",
		// sHead + "\n" + getSlice( "PerformanceCharacteristics",
		// sHead + "\n" + getSlice( "Operation",
		// sHead + "\n" + getSlice( "ControlandRegulation",
		// sHead + "\n" + getSlice( "TargetedMarketSegment",
		// sHead + "\n" + getSlice( "ConsumerAcceptance",
		// sHead + "\n" + getSlice( "Merchandising",
		// sHead + "\n" + getSlice( "MarketPrice",
		// sHead + "\n" + getSlice( "TechSignificance",
		// sHead + "\n" + getSlice( "IndSignificance",
		// sHead + "\n" + getSlice( "EconSignificance",
		// sHead + "\n" + getSlice( "CultSignificance",
		// sHead + "\n" + getSlice( "Donor",
		// sHead + "\n" + getSlice( "StorageLocation",
		// sHead + "\n" + getSlice( "Tracking",
		// sHead + "\n" + getSlice( "BiblioRef",
		// sHead + "\n" + getSlice( "Notes",
		sHead + "\n" + getSlice( db, row.AccessionNo, "RelatedReports") + "\n" 
		
		
	//
	// Add all the fields (skip the accession no and class code added above)
	//
	
	// for( let i=2;  i<4; i++ ){
	// for( let i=2;  i<dataFields.tokens.length-1; i++ ){
		// sPage += dataFields.tokens[i] + "\n" + row[dataFields.fields] + "\n\n";
	// }
	
	// for( let element of row ) {
		// console.log( element );
	// }
	
	
	// console.log( sPage );
	
	// db.parallelize();
	

}

//
//  makeSQL - function
//  -------
//
//  Helper for buildMap
//
function makeSQL( sField ){
	let sSQL = "SELECT DISTINCT " + sField + " AS slice FROM report " +
			   " WHERE AccessionNo = '2003.020'";
	return sSQL;
}

//  buildMap - function
//  --------
//
//  Builds a map of the text fields from the database
//
//  This *seems* like the only way to do this based on the parallel db operation
//  Caution with the use of variable i if they don't execute in sequence...
//
function buildMap(  ){
	let db2 = new sqlite3.Database('reports.sqlite');

	var mapSlices = new Map();
	var i = 2;
	
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
																																							console.log( i, dataFields.fields.length );
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
	//  Must wait for the close to complete before we can use the Map
	//
	db2.close((err) => {
	  if (err)
			console.log(err.message);
	  else{
			console.log('Close the database2 connection.');
			console.log( "mapSlices", mapSlices );
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
	buildMap( );
}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('reports.sqlite')
// let sql = "SELECT * FROM report";
let sql = "SELECT * FROM report WHERE AccessionNo = '2003.020'";


try {
	// db.serialize();
	db.each( sql, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close( );
// db.close((err) => {
  // if (err)
    // console.log(err.message);
  // else{
    // console.log('Close the database connection.');
	// console.log( "***THE PAGE****\n",sPage );
  // }
// });

