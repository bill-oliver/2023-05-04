var fs = require('fs');

const tokens = [ "HHCC Accession No.",
				" +HHCC Classification Code:",
				"Last Modified:",
				"Group:",
				"Description:",
				"Film Image:",
				"Digital Image:",
				"Make:",
				"Manufacturer:",
				"Model:",
				"Serial No.:",
				"Size:",
				"Weight:",
				"Circa:",
				"Rating:",
				"Patent Date/Number:",
				"Provenance:",
				"Type and Design:",
				"Construction:",
				"Material:",
				"Special Features:",
				"Accessories",
				"Capacities:",
				"Performance Characteristics:",
				"Operation:",
				"Control and Regulation:",
				"Targeted Market Segment:",
				"Consumer Acceptance:",
				"Merchandising:",
				"Market Price:",
				"Technological Significance:",
				"Industrial Significance:",
				"Socio-economic Significance:",
				"Socio-cultural Significance:",
				"Donor:",
				"HHCC Storage Location:",
				"Tracking:",
				"Bibliographic References:",
				"Notes:",
				"Related Reports",
				"\f" ];

function findSlice( sReport, sToken1, sToken2 ) {
	var iToken1 = sReport.indexOf( sToken1 ) + sToken1.length;
	var iToken2 = sReport.indexOf( sToken2, iToken1 );
	var sSlice = sReport.slice( iToken1, iToken2 );
	
	console.log( sToken1, sToken1.length, sToken2, iToken1, iToken2, ":" );
	console.log( "Slice: ***", sSlice, "***" );
	console.log( "Length:", sSlice.length );
	console.log( "" );

	//
	//  CLEAN IT UP 
	//
	while( sSlice.charCodeAt(0) <= 32 && sSlice.length > 0 ){
//		console.log( sSlice.charCodeAt(0));
		sSlice = sSlice.substring(1);
	}

	while( sSlice.charCodeAt(sSlice.length-1) <= 32 && sSlice.length > 0 ){
//		console.log( sSlice.charCodeAt(sSlice.length-1));
		sSlice = sSlice.substring(0, sSlice.length-2 );
	}
	
/* 	console.log( sToken1, ":" );
	console.log( "Slice: ***", sSlice, "***" );
	console.log( "Length:", sSlice.length );
	console.log( "" );
 */	return sSlice;
}

var sSlice;
var sReport;
var fnReport;

//
//  Read all the report files in the directory
//
var a = fs.readdirSync("reports");

//
// One report
//
fnReport = a[1]
sReport = fs.readFileSync( "reports/" + fnReport, {encoding: 'utf8' } );

console.log( "read ", sReport.length, "bytes from ",  fnReport );

//
//  Trim off the garbage at the top of the word doc
//
const sHeader = "Research Reports \rFounding Collection, HVACR Heritage Centre Canada";
sReport = sReport.slice( sReport.indexOf( sHeader ), sReport.length );

console.log( "trimed ", sReport.length, "bytes from ",  fnReport );
console.log( sReport.slice( 0, 10) );


/* for( var i=0;  i<tokens.length-1; i++ ){
//	console.log( tokens1[i], tokens1[i+1]);
	sSlice = findSlice( sReport, tokens[i], tokens[i+1] );
}
 */	
var iToken = 33;
sSlice = findSlice( sReport, tokens[iToken], tokens[iToken+1] );

/*  for( var i=2;  i<tokens.length-1; i++ ){
//	console.log( tokens1[i], tokens1[i+1]);
	sSlice = findSlice( sReport, tokens[i], tokens[i+1] );
}
 */	
