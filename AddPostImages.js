//
//  Add Post feature and gallery images to the publii media folders
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
//  AddPostImages - copies feature and gallery images into the correct media folders
//
function AddPostImages( sClassification, sReportID ){
    dbReport.all( "SELECT ImageFile from Images WHERE ReportID = ?;", [sReportID],
                    (err, rows) => {
		if( err || rows.length == 0 ){
			throw new Error( "No Image files for" + sClassification );
		}

        var Images = [];
        for( let i=0; i<rows.length; i++ ){
            Images[i] = rows[i].ImageFile;
        }

        dbPublii.get( "SELECT id FROM posts WHERE slug = ?", [sClassification],
                        (err, row) => {
            if( err || row === null ){
                throw new Error( "No post for" + sClassification );
            }

            let sPath = sPathMedia + "posts\\" + row.id;
            fs.mkdirSync( sPath );

            // console.log(Images);

            CopyImage( Images[0], sPath );   // Feature image

            sPath += "\\gallery";
            fs.mkdirSync( sPath );
            for( let i=0; i<Images.length; i++ ){
                CopyImage( Images[i], sPath );  // Gallery Images
            }
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
	AddPostImages( row.Classification, row.ID );
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

