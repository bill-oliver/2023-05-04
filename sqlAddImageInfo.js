//
//  Add inofrmation for jpg images to report db
//
//  Uses the node-exifs library (https://github.com/gomfunkel/node-exif)
//
"use strict";

const fs = require('fs');
// const EXIF = require('exif');
var ExifImage = require('exif').ExifImage;


function ProcessImages() {
    var dbReports = new sqlite3.Database('reports.sqlite');
    // let sSQLImage = "INSERT INTO Images( ReportID, ImageFile ) VALUES( ?, ? );";
    let sPath = ".\\Images";
    let ImageFiles = fs.readdirSync( sPath );

	for( let i=0; i<ImageFiles.length; i++ ){
		var sImg = sPath + "\\" + ImageFiles[i];
		// var sImg = "..\\temp\\PXL_20230517_223041446.jpg";
	    new ExifImage({ image : sImg }, function (error, exifData) {
		// EXIF.loadImage( sImg, function (error, exifData) {
			if (error)
				throw error;
			else
				console.log(exifData); // Do something with your data!
		});
	}
}


// try {
//     new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
//         if (error)
//             console.log('Error: '+error.message);
//         else
//             console.log(exifData); // Do something with your data!
//     });
// } catch (error) {
//     console.log('Error: ' + error.message);
// }


//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();

try {
	ProcessImages();
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}




