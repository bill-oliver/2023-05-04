//
//  Associates tags with posts in the Publii db 
//
// 
//

"use strict";

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
		// dbPublii.run( sSQLPostTags, [ PostTags[i], PostTags[i+1] ] );
	}

	dbPublii.close();
}

//
//  AddPostTags - Adds all the tags for a given report
//
//   sClassification - Classification code for report
//
function AddPostTags( ){
	var dbReports = new sqlite3.Database('reports.sqlite')
	var dbPublii = new sqlite3.Database('db.sqlite');

	var sSQLClassification = "SELECT Classification FROM report;";
	var sSQLPost = "SELECT id from posts WHERE slug = ?;";
	var sSQLTag = "SELECT id from tags WHERE slug = ?;";
	
	var PostTags = [];				// Ordered list of TagId, PostIDs

	//
	//  For each report in reports db, get its classification code
	//
	dbReports.each( sSQLClassification, [], (err, row) => {
		//
		//  Lookup the post in publii db
		//
		dbPublii.get( sSQLPost, [ row.Classification ], (err, row) => {
			if( err ){
				throw new Error( "Post not found for " + sClassification );
			}

			var idPost = row.id;
			var sTagSlug = CreateSlug( GetTag( sClassification ) );
			//
			//  Lookup the tag for that post based on the classification code
			//
			dbPublii.get( sSQLTag, [ sTagSlug ], (err, row) => {
				if( err ){
					throw new Error( "Tag entry not found for " + sClassification );
				}

				//
				// Now we have both IDs, link 'em
				//
				var idTag = row.id;
				PostTags.push( idTag );
				PostTags.push( idPost);
				// console.log( sClassification, "tagID,PostID", idTag, idPost );

				// dbPublii.run( sSQLPostTags, [ idTag, idPost ] );
			});
		});
	});

	//
	//  Must wait for the dbs to close to complete before we can access the Data
	//
	dbReports.close((err) => { 
		if (err){
			console.log(err.message);
		}
		dbPublii.close((err) => {
			if (err){
				console.log(err.message);
			}
			WritePostTags( PostTags );
		});
	});
}

//
//  Main
//  ----
//
try {
	AddPostTags();
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

