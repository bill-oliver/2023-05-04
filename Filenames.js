//
// Rename image files
//
var fs = require('fs');

function fixImageFiles(){
    let sPath = ".//images";

    let ImageFiles = fs.readdirSync( sPath );
    //console.log(ImageFiles);
    
    sPath += "//";

    for( let i=0; i<ImageFiles.length; i++){

        if( ImageFiles[i].toLowerCase().indexOf(".jpg") < 0 ){
            throw new Error( ImageFiles[i] + "  is not a jpg********");
        }

        let iStrip = ImageFiles[i].indexOf(" (");
        if( iStrip > 0 ){
            let sNew = ImageFiles[i].slice( 0, iStrip ) + ".jpg";
//            console.log( ImageFiles[i], "->", sNew );
            fs.renameSync( sPath + ImageFiles[i], sPath + sNew );
        }
    }
}

//
//  Main
//  ----
//
try {
    fixImageFiles();
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}
