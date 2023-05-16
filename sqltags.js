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
	var sSQLSelectPosts = "SELECT id, title FROM posts  WHERE slug BETWEEN ? AND ?;";
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
			var i;
			for( i=0; i < rowsTag.length-1; i++ ){
				//
				//  For all posts with this tag
				//
				dbPublii.all(  sSQLSelectPosts,
											[ rowsTag[i].name, rowsTag[i+1].name ],
											( err, rowsPost ) => {
					if( err )
						throw err;
					else{
						//
						//  Add them to the database
						//
						console.log( i, rowsTag[i].id, rowsTag[i].name );
						console.log( rowsPost );
						// console.log( i, rowsTag[i].id, rowsTag[i].name, rowPost.id, rowPost.title );
						// dbPublii.run( sSQLAddPostID,
						              // [ rowsTag[i].id, rowPost.id ] );
					}
				});
			}
				
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

