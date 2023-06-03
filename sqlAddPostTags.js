//
//  Associates tags with posts in the Publii db 
//
// 
//

"use strict";

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

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
//  WritePostTags - writes out the ordered list of tags
//                   created by AddPostTags
//
//
function WritePostTags( PostTags ){
	var dbPublii = new sqlite3.Database('db.sqlite');
	var sSQLPostTags = "INSERT INTO posts_tags( tag_id, post_id ) VALUES( ?, ? );";

	console.log( "PostTags.length", PostTags.length );
	for( let i = 0; i < PostTags.length; i += 2 ){
		console.log( i, PostTags[i], PostTags[i+1] );
		dbPublii.run( sSQLPostTags, [ PostTags[i], PostTags[i+1] ] );
	}

	dbPublii.close();
}

//
//  AddPostTags - Adds all the tags for a given report
//
//   Classification code for reports (rows from report db)
//
function AddPostTags( rowClassifications ){
	var dbPublii = new sqlite3.Database('db.sqlite');
	var sSQLPost = "SELECT id from posts WHERE slug = ?;";
	var sSQLTag = "SELECT id from tags WHERE slug = ?;";
	
	var PostTags = [];				// Ordered list of TagId, PostIDs

	//
	//  Process the classification codes for each report
	//
	for( let i=0; i < rowClassifications.length; i++ ){
		let sClassification = rowClassifications[i].Classification;

		//
		//  Look up the corresponding post in Publii db
		//
		dbPublii.get( sSQLPost, [ sClassification ], (err, row) => {
			if( err ){
				throw new Error( "Post not found for " + sClassification );
			}

			//
			//  Find the tag according to the classification code
			//
			var idPost = row.id;
			var sTagSlug = CreateSlug( GetTag( sClassification ) );

			dbPublii.get( sSQLTag, [ sTagSlug ], (err, row) => {
				if( err ){
					throw new Error( "Tag entry not found for " + sClassification );
				}

				//
				// Now we have both Punblii tag and post IDs, link 'em
				// in our array
				//
				var idTag = row.id;
				PostTags.push( idTag );
				PostTags.push( idPost);
			});
		});
	}

	//
	//  Must wait for the close to complete before we can access the our array
	//
	dbPublii.close((err) => {
		if (err){
			  console.log(err.message);
		}
		WritePostTags( PostTags );  // Now we can write them out!
	});
}

//
//  dbCallback - function
//  ----------
//
//  Callback for Database.each function
//
function dbCallback( err, rows ){
	if( err ){
		throw err;
	}
	AddPostTags( rows );
}
	
//
//  Main
//  ----
//
let db = new sqlite3.Database('reports.sqlite')
let sSQL = "SELECT Classification FROM report;"

try {
	// db.serialize();
	db.all( sSQL, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close( );

