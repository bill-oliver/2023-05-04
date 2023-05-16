"use strict";

var fs = require('fs');

//
//  tagPosts - function
//  --------
//
//  Add classification tags to each post
//
function tagPosts( ){
	var dbPublii = new sqlite3.Database('db.sqlite');  // Publii database  (make a copy!!!)
	var sSQLSelectTags = "SELECT id, name FROM tags WHERE name > '1.00' AND name < '99.99' ORDER BY name;";
	var sSQLSelectPosts = "SELECT id, slug FROM posts  WHERE slug BETWEEN '1.00' AND '99.99' ORDER BY slug;";
	var sSQLAddPostID = "INSERT INTO posts_tags( tag_id, post_id ) VALUES( ?, ? );";
	
	//
	//  find all the Classification tags
	//
	dbPublii.all( sSQLSelectTags,
								[], ( err, rowsTag ) => {
		if( err )
			throw err;
	  else{
			// console.log( rowsTag );
			//
			//  For all posts with this tag
			//
			dbPublii.each(  sSQLSelectPosts,
										[], ( err, rowPost ) => {
				if( err )
					throw err;
				else{
					let sTag = rowPost.slug.slice( 0, rowPost.slug.indexOf( '-' ) );
					let iTag = 0;
					while( rowsTag[ iTag ].name != sTag ){
						iTag++;
						if( iTag >= rowsTag.length ){
							throw new Error( "Tag not found for post " + rowPost.slug );
						}
					}
						
					//
					//  Add them to the database
					//
					// console.log(  );
					// console.log( iTag, sTag );
					// console.log( rowsTag[iTag].id, rowsTag[iTag].name );
					// console.log( rowPost );
					console.log( rowsTag[iTag].id, rowsTag[iTag].name, rowPost.id, rowPost.slug );
					dbPublii.run( sSQLAddPostID,
												[ rowsTag[iTag].id, rowPost.id ] );
				}
			});
			
				
		//
		//  Process the posts with the last tag
		//
		// dbPublii.each( sSQLSelectPosts,
									// [ rowsTag[i].name, "99.99" ],
									// ( err, rowPost ) => {
				// if( err )
					// throw err;
				// else{
					// console.log( rowsTag[rowsTag.length].id, rowsTag[rowsTag.length].name, rowPost.id, rowPost.title );
					// dbPublii.run( sSQLAddPostID,
												// [ rowsTag[rowsTag.length].id, rowPost.id ] );
				// }
			// });
		}
	});
	
	dbPublii.close();
}
	
//
//  createTags - function
//  ----------
//
//  Creates a new tag in the publii db for report classification
//
function createTags( ){
	var dbPublii = new sqlite3.Database('db.sqlite');  // Publii database  (make a copy!!!)
	var dbReports = new sqlite3.Database('reports.sqlite');
	
	var sSQLTag = "INSERT INTO tags( name, slug, description, additional_data  ) " +
								"VALUES( ?, ?, ?, ? );"

	//
	// Get reference data from the reference tag we are cloning
	//
	dbPublii.get( "SELECT DISTINCT * FROM tags WHERE slug = 'reference'", 
								[], ( err, rowRefTag ) => {
		if( err ){
			throw err;
			// console.error( err.name );
			// console.error( err.message );
		}
	  else {
			//
			//  Process all the entries in our Classification table
			//
			dbReports.each( "SELECT * FROM Classifications",
												[],
												( err, rowNewTag ) => {
					
				if( err ) {
					throw err;
					// console.error( err.name );
					// console.error( err.message );
				}
				else {
					console.log( rowNewTag.Code );
					dbPublii.run( sSQLTag,
											[ rowNewTag.Code,      // name
												rowNewTag.Code,      // slug
												rowNewTag.Description,
												rowRefTag.additional_data ] );
				}
			} );
		}
	});
	
	// dbPublii.close();
	// dbReports.close();   // **** vClosing too early!
}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();

try {
	// createTags();
	tagPosts();
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

