//
//  Associates posts with their featured image in the Publii db 
//
//   Currently we use the first image for that classification code in the
//   Images table 
//   (must agree with what we've put in the media folder see AddPostImages)
//   
//

"use strict";

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var dbReport = new sqlite3.Database('reports.sqlite');
var dbPublii = new sqlite3.Database('db.sqlite');

const sAdditionalData= '{"alt":"","caption":"","credits":""}';

//
//  AddPostImage - Adds Featured image a given report
//
//   ReportID - id from report table
//   sClassification - Classification code for report
//
function AddPostImage( sClassification, sReportID  ){
    dbReport.get( "SELECT ImageFile from Images WHERE ReportID = ?;", [sReportID],
                    (err, row) => {
		if( err || row === null ){
			throw new Error( "No Image files for" + sClassification );
		}

		var sImage = row.ImageFile;

        dbPublii.get( "SELECT id FROM posts WHERE slug = ?", [sClassification],
                        (err, row) => {
            if( err || row === null ){
                throw new Error( "No post for" + sClassification );
            }

			console.log( sClassification, sImage );
			dbPublii.run( "INSERT INTO posts_images( post_id, url, additional_data ) "
			  			+ "VALUES( ?, ?, ? );", [ row.id, sImage, sAdditionalData ] );
		});
	} );
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
	AddPostImage( row.Classification, row.ID  );
}
	
//
//  Main
//  ----
//

let sSQL = "SELECT Classification, ID FROM report;"

try {
	dbReport.each( sSQL, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

dbReport.close( );

