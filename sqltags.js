"use strict";

var fs = require('fs');

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
	// dbReports.close();
}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();

try {
	createTags();
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

