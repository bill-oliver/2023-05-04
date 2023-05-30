//
//  Add images to the publii media folders for tags
//
//  The Regenerate thumbnails option should be run from the Publii Tools & Plugins screen afterwards
//

"use strict";

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

var dbReport = new sqlite3.Database('reports.sqlite');
var dbPublii = new sqlite3.Database('db.sqlite');

const sPathMedia = "C:\\Users\\boliv\\OneDrive\\Documents\\Publii\\sites\\oliver-associates\\input\\media\\";
const sPathImages = "C:\\Users\\boliv\\OneDrive\\Documents\\Projects\\Website\\2023-05-04\\Images\\";

//
//  CopyImage - copies and image file into the specified folder
//
function CopyImage( sFile, sPath ){
    let sSrc = sPathImages + sFile;
    let sDest = sPath + "\\" + sFile;
    console.log( sSrc );
    console.log( sDest );
    fs.copyFileSync( sSrc, sDest );
    if( !fs.existsSync( sDest ) ){
        throw new Error( "Error creating " + sDest );
    }
}


//
//  AddTagImages - copies feature and gallery images into the correct media folders
//
function AddTagImages( sTag, sImageFile ){

    dbPublii.get( "SELECT id FROM tags WHERE slug = ?", [sTag],
                    (err, row) => {
        if( err || row === null ){
            throw new Error( "No tag entry for" + sTag );
        }

        let sPath = sPathMedia + "tags\\" + row.id;
        fs.mkdirSync( sPath );

        // console.log(Images);
        CopyImage( sImageFile, sPath );   // Feature image
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
	AddTagImages( row.Code, row.Image );
}
	
//
//  Main
//  ----
//
let sSQL = "SELECT Code, Image FROM Classifications;"

try {
	dbReport.each( sSQL, [], dbCallback );			// Process all items in db
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

dbReport.close( );

