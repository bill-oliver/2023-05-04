//
//  Add inofrmation for jpg images to report db
//
//  Uses the piexifjs library (npm install piexifjs)
//  see https://auth0.com/blog/read-edit-exif-metadata-in-photos-with-javascript/
//
"use strict";

const fs = require('fs');
const EXIF = require('exif-js');


function ProcessImages() {
    var dbReports = new sqlite3.Database('reports.sqlite');
    // let sSQLImage = "INSERT INTO Images( ReportID, ImageFile ) VALUES( ?, ? );";
    let sPath = ".\\Images";
    let ImageFiles = fs.readdirSync( sPath );

	for( let i=0; i<ImageFiles.length; i++ ){
		var sImg = sPath + "\\" + ImageFiles[i];
		EXIF.getData( sImg, function() {
			var allMetaData = EXIF.getAllTags(this);
			console.log( allMetaData );
		});
	
	}
}

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




