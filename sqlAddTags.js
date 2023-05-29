//
//  Adds tags to the Publii db from Classifications in report.db
//  and links them to the correct report (posts)
//
// 
//

"use strict";

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const sTagData1 = '{"viewConfig":{},"featuredImage":"';
const sTagData2 = '","featuredImageAlt":"","featuredImageCaption":"","featuredImageCredits":"","isHidden":false,"metaTitle":"","metaDescription":"","metaRobots":"","canonicalUrl":"","template":""}';


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
	buildMap( row.AccessionNo );
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

