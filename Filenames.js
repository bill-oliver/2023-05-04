//
// Clean up image file names
//
var fs = require('fs');

function fixImageFiles(){
    let sPath = ".//images";  // all images in sub folder

    let ImageFiles = fs.readdirSync( sPath );  // read them in
    //console.log(ImageFiles);
    
    sPath += "//";

    for( let i=0; i<ImageFiles.length; i++){

        sNew = ImageFiles[i].toLowerCase();

        if( sNew.indexOf(".jpg") < 0 ){
            throw new Error( sNew + "  is not a jpg********");
        }

        //
        //  orginal files have a number in brackets after the name
        //  i.e. "1.02-3a (12).jpg"
        //
        let iStrip = sNew.indexOf(" (");
        if( iStrip > 0 ){
            sNew = sNew.slice( 0, iStrip ) + ".jpg";
        }

        //
        // some files have a second dot instead of a dash
        //  i.e. "1.02.3a.jpg"
        //
        let iDot = sNew.indexOf( "." );
        iDot = sNew.indexOf( ".", iDot + 1 );
        if( sNew.charAt( iDot+1 ) != "j" ){
            sNew = sNew.slice( 0, iDot ) + "-" + sNew.slice( iDot+1 );
        }

        if( sNew != ImageFiles[i] ){
            console.log( ImageFiles[i], "->", sNew );
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
