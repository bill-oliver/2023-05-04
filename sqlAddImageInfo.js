//
//  Add inofrmation for jpg images to report db
//
//  Uses the image-size library (https://github.com/image-size/image-size)
//
"use strict";

const fs = require('fs');

const sizeOf = require('image-size')


function ProcessImages() {
    var dbReports = new sqlite3.Database('reports.sqlite');
    let sSQL = "UPDATE Images SET Height = ?, Width = ? WHERE ImageFile = ?;";
    let sPath = ".\\Images";
    let ImageFiles = fs.readdirSync( sPath );

	for( let i=0; i<ImageFiles.length; i++ ){
		var sImg = sPath + "\\" + ImageFiles[i];
		const dimensions = sizeOf( sImg );
		// console.log( ImageFiles[i], dimensions.width, dimensions.height );
		dbReports.run( sSQL, [dimensions.height, dimensions.width, ImageFiles[i] ] );
	}
}

// const dimensions = sizeOf('images/funny-cats.png')
// console.log(dimensions.width, dimensions.height)

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




