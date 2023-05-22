"use strict";
//
//  Validates AccessionNo and Classification in the word document against the database
//  based on readreport.js
//
var fs = require('fs');

//
//  dataFields structure: Cross references fields in database with tokens in Report
//
const dataFields = {
	tokens : [
		"HHCC Accession No.",
		"HHCC Classification Code:",
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
		"\f" ],
	fields : [
		"AccessionNo",
		"Classification",
		"LastModified",
		"Grp",
		"Description",
		"FilmImage",
		"DigitalImage",
		"Make",
		"Manufacturer",
		"Model",
		"SerialNo",
		"Size",
		"Weight",
		"Circa",
		"Rating",
		"PatentDateNumber",
		"Provenance",
		"TypeandDesign",
		"Construction",
		"Material",
		"SpecialFeatures",
		"Accessories",
		"Capacities",
		"PerformanceCharacteristics",
		"Operation",
		"ControlandRegulation",
		"TargetedMarketSegment",
		"ConsumerAcceptance",
		"Merchandising",
		"MarketPrice",
		"TechSignificance",
		"IndSignificance",
		"EconSignificance",
		"CultSignificance",
		"Donor",
		"StorageLocation",
		"Tracking",
		"BiblioRef",
		"Notes",
		"RelatedReports",
		"" ]
}
	
//
//  cleanString - function
//  -----------
//
//  Cleans up the block of text retrieved by findSlice
//
function cleanString( sIn ){
	var sOut = "";
	
	//
	//  Trim of leading and trailing non-printables
	//
	while( sIn.charCodeAt(0) <= 32 && sIn.length > 0 ){
//		console.log( sIn.charCodeAt(0));
		sIn = sIn.substring(1);
	}

	while( sIn.charCodeAt(sIn.length-1) <= 32 && sIn.length > 0 ){
//		console.log( sIn.charCodeAt(sIn.length-1));
		sIn = sIn.substring(0, sIn.length-1 );
	}
	
	// 
	// Fix up new lines and other stuff word has embeded
	//
	for( let i = 0; i < sIn.length; i++ ){
		let sChar = sIn.charAt( i );
		if ( sChar == '\r' ){
			sOut += '\n';           	// return should be new line
		} 
		else if( sChar == "'" ) {
			sOut += "''";				//  Need to double up on quotes for SQL string
		}
		else if( sChar.charCodeAt( 0 ) == 65533 ) {
			sOut += "''";				//  This seems to be a quote in word
		}
		else if( sChar > '\x7e' ){		//  Unexpected non-ascii character
			console.log( "***** Unexpected char " + sChar.charCodeAt( 0 ) 
							+ " at postion " + i + " in slice: \n" + sIn );
			sOut += "****"	;				
		} 
		else {
			sOut += sChar;
		}
	}
	// console.log( "sIn", sIn );
	// console.log( "sOut", sOut );
	
	return sOut;
}

//
//  findSlice - function
//  ---------
//
//  Returns the block of text between to heading tokens in the Report
//
//  sReport - string containing report text
//  sToken1 - leading token (heading for data to be retreived
//  sToken2 - terminating token (heading for next block of text)
//
function findSlice( sReport, sToken1, sToken2 ) {
	let iToken1 = sReport.indexOf( sToken1 ) + sToken1.length;
	let iToken2 = sReport.indexOf( sToken2, iToken1 );
	let sSlice = "";
	
	// console.log( sToken1, sToken1.length, sToken2, iToken1, iToken2, ":" );
		
	if( iToken1 < 0 ){
		console.log( "**** Token " + sToken1 + " not found " );      //  **** ERROR ****
	}
	else if( iToken2 < 0 ){
		console.log( "**** Token " + sToken2 + " not found " );      //  **** ERROR ****
	}
	else {
		sSlice = sReport.slice( iToken1, iToken2 );

		//
		//  CLEAN IT UP 
		//
		// console.log( "trimed Slice: ***", sSlice, "***" );
		// console.log( "Length:", sSlice.length );
		// console.log( "" );
		
		
		sSlice = cleanString( sSlice );
		
		// console.log( sToken1, "***", sSlice, "***" );
		// console.log( "Length:", sSlice.length );
		// console.log( "" );
	}

	return sSlice;
}



//
//  CheckXREF - function
//
//  Validate the Classification code in the doc against in the database
//  Populated by sqlxref.js from data in HHCC Artifact Cross Reference Tables.docx.
//  There are errors in this table!!!
//
function CheckXREF( dbReports, sReport, sAccessionNo ){
	let sRptAccession = findSlice( sReport, dataFields.tokens[0], dataFields.tokens[1] );
	let sRptClassification = findSlice( sReport, dataFields.tokens[1], dataFields.tokens[2] );

	if( sRptAccession != sAccessionNo ){
		console.log( "*** ERROR: AccessionNo", sAccessionNo, "in report as", sRptAccession );
	}

	let sSQL = "SELECT Classification, AccessionNo FROM report WHERE AccessionNo = '" + sAccessionNo + "';";
	dbReports.all( sSQL, ( err, rows ) => {
		if( err ){
			throw err;
		}
		else {
			if( rows.length > 1 ){
				console.log( "*** ERROR: Multiple rows found for AccessionNo", sAccessionNo );
			}
			else if( rows[0].Classification != sRptClassification ){
				console.log( "*** ERROR: db", rows[0].AccessionNo, rows[0].Classification, 
				             "in report as", sRptClassification );
			}
		}
	} );
}

//
//  updateReportDB - function
//  --------------
//
//  Processes a research report word file.
//
//  dbReports - reports database object 
//  sAccessionNo - the "Accession number" identifying the report to be processed (e.g. "2003.001")
//
function processReportDB( dbReports, sAccessionNo ) {
	let sFileName = "./reports/Res. Rpts. Founding Collection " + sAccessionNo + ".doc";
	
	//
	// Read the word document
	//
	let sReport = fs.readFileSync( sFileName, {encoding: 'utf8' } );

	console.log( "\nProcessing: ",  sFileName );

	//
	//  Trim off the garbage at the top 
	//
	const sHeader = "Research Reports";
	let iOffset = sReport.indexOf( sHeader );
	// console.log( "Header offset", iOffset );

	CheckXREF( dbReports, sReport, sAccessionNo );
	// readTokens( dbReports, sAccessionNo, 
	            // sReport.slice( iOffset ), 4 );  	// Test one token only
	// readTokens( dbReports, sAccessionNo, 
	//             sReport.slice( iOffset ) );  		// All tokens
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
	processReportDB( db, row.AccessionNo );

}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite');
// let sql = "SELECT DISTINCT AccessionNo FROM report WHERE LastModified IS NULL ORDER BY AccessionNo";
let sql = "SELECT DISTINCT AccessionNo FROM report ORDER BY AccessionNo";

try {
	// db.serialize();
	db.each( sql, [], dbCallback );			// Process all items in db
	// processReportDB( db, "2003.020" );	// *****TEST ONE REPORT
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close();

