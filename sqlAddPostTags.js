//
//  Associates tags with posts in the Publii db 
//
// 
//

"use strict";

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const sTagData1 = '{"viewConfig":{},"featuredImage":"';
const sTagData2 = '","featuredImageAlt":"","featuredImageCaption":"","featuredImageCredits":"","isHidden":false,"metaTitle":"","metaDescription":"","metaRobots":"","canonicalUrl":"","template":""}';

//
// GetTag - gets the tag portion of the classification number
//
function GetTag( sClassification ){
	return sClassification.slice( 0, sClassification.indexOf( "-") );
}

//
//  AddPostTags - Adds all the tags for a given report
//
//   sClassification - Classification code for report
//
function AddPostTags( sClassification ){
	var dbPublii = new sqlite3.Database('db.sqlite');
	var sSQLPost = "SELECT id from posts WHERE slug = ?;";
	var sSQLPostTags = "INSERT INTO posts_tags( tag_id, post_id ) VALUES( ?, ? );";
	
	dbPublii.get( sSQLPost, [ sClassification ], (err, row) => {
		if( err ){
			throw new Error( "Post not found for " + sClassification );
		}

		// console.log( sClassification, GetTag( sClassification ), row );
		dbPublii.run( sSQLPostTags, [ GetTag( sClassification ), row.id ] );
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
	AddPostTags( row.Classification );
}
	
//
//  Main
//  ----
//
let db = new sqlite3.Database('reports.sqlite')
let sSQL = "SELECT Classification FROM report;"

try {
	// db.serialize();
	db.each( sSQL, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close( );

