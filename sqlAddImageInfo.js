//
//  Add inofrmation for jpg images to report db
//
//  Uses the piexifjs library (npm install piexifjs)
//  see https://auth0.com/blog/read-edit-exif-metadata-in-photos-with-javascript/
//
"use strict";

const fs = require('fs');
const piexif = require('piexifjs');


// Given a Piexifjs object, this function displays its Exif tags
// in a human-readable format
function debugExif(exif) {
    for (const ifd in exif) {
        if (ifd == 'thumbnail') {
            const thumbnailData = exif[ifd] === null ? "null" : exif[ifd];
            console.log(`- thumbnail: ${thumbnailData}`);
        } else {
            console.log(`- ${ifd}`);
            for (const tag in exif[ifd]) {
                console.log(`    - ${piexif.TAGS[ifd][tag]['name']}: ${exif[ifd][tag]}`);
            }
        }
    }
}


function ReadImages() {
    var dbReports = new sqlite3.Database('reports.sqlite');
    // let sSQLImage = "INSERT INTO Images( ReportID, ImageFile ) VALUES( ?, ? );";
    let sPath = ".\\Images";
    let ImageFiles = fs.readdirSync( sPath );

	for( let i=0; i<ImageFiles.length; i++ ){
		if( ImageFiles[i].toLowerCase().match( sMask ) ){
			iFound++;
			// console.log( ImageFiles[i] );
			dbReports.run( sSQLImage,
						 [ rowReport.ID,
						   ImageFiles[i] ] );
		}
	}
}

const palm1Exif = getExifFromJpegFile("./images/palm tree 1.jpg");
const piexif = require('piexifjs');

// Handy utility functions
const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));




