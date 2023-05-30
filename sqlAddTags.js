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
//  AddTag - Adds a tag to the Publii database from Classifications table
//
//   row - row structure from Classifications table
//
function AddTag( row ){
	let dbPublii = new sqlite3.Database('db.sqlite');
	var sSQL = "INSERT INTO tags( name, slug, description, additional_data ) " +
						 "VALUES( ?, ?, ?, ? );";
	
	dbPublii.run( sSQL, [ row.Tag, row.Code, row.Description, 
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

