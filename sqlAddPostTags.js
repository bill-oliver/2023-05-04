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
//  CreateSlug - creates a valid slug from Classification code (can't have a dot)
//  (also in sqlAddTags)
//
//  Code usually looks like 1.01, 12.08.  
//  Replace the dot with an underscore (1_01, 12_08)
//
function CreateSlug( sCode ){
	let iDot = sCode.indexOf( "." );
	let sRet = sCode.slice( 0, iDot ) + "_" + sCode.slice( iDot+1 );
	return sRet;
}

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
	var sSQLTag = "SELECT id from tags WHERE slug = ?;";
	var sSQLPostTags = "INSERT INTO posts_tags( tag_id, post_id ) VALUES( ?, ? );";
	
	dbPublii.get( sSQLPost, [ sClassification ], (err, row) => {
		if( err ){
			throw new Error( "Post not found for " + sClassification );
		}

		var idPost = row.id;
		var sTagSlug = CreateSlug( GetTag( sClassification ) );

		dbPublii.get( sSQLTag, [ sTagSlug ], (err, row) => {
			if( err ){
				throw new Error( "Tag entry not found for " + sClassification );
			}

			//
			// Now we have both IDs, link 'em
			//
			var idTag = row.id;
			console.log( sClassification, "tagID,PostID", idTag, idPost );

			setTimeout( () => {
				dbPublii.run( sSQLPostTags, [ idTag, idPost ] );
			}, 1000 );
		});
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

