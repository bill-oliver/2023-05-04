//
//  Adds tags to the Publii db from Classifications in report.db
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
//  (also in AddTagImages)
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
//  AddTag - Adds a tag to the Publii database from Classifications table
//
//   row - row structure from Classifications table
//
function AddTag( row ){
	let dbPublii = new sqlite3.Database('db.sqlite');
	var sSQL = "INSERT INTO tags( name, slug, description, additional_data ) " +
						 "VALUES( ?, ?, ?, ? );";
	let sSlug = CreateSlug( row.Code);

	console.log( row.Tag, sSlug );
	dbPublii.run( sSQL, [ row.Tag, sSlug, row.Description, 
						  sTagData1 + row.Image + sTagData2  ] );
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
	AddTag( row);
}
	
//
//  Main
//  ----
//
let db = new sqlite3.Database('reports.sqlite')
let sSQL = "SELECT * FROM Classifications";

try {
	// db.serialize();
	db.each( sSQL, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close( );

