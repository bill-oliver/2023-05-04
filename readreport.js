"use strict";

var fs = require('fs');

//
//  dataFields structure: Cross references fields in database with tokens in Report
//
const dataFields = {
	tokens : [
		"HHCC Accession No.",
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
		"\f" ],
	fields : [
		"AccessionNo",
		"Classification",
		"LastModified",
		"Group",
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
//  Cleans up the block of text retreived by findSlice
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
	for( var i = 0; i < sIn.length; i++ ){
		var sChar = sIn.charAt( i );
		if ( sChar == '\r' ){
			sOut += '\n';           	// return should be new line
		} 
		else if( sChar.charCodeAt( 0 ) == 65533 ) {
			sOut += "'";				//  This seems to be a quote in word
		}
		else if( sChar > '\x7e' ){		//  Unexpected non-ascii character
				console.log( "***** ", sChar.charCodeAt( 0 ), "at postion", i );
				sOut +=  '@';
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
//  Returns the block of text between to heding tokens in the Report
//
//  sReport - string containing report text
//  sToken1 - leading token (heading for data to be retreived
//  sToken2 - terminating token (heading for next block of text)
//
function findSlice( sReport, sToken1, sToken2 ) {
	var iToken1 = sReport.indexOf( sToken1 ) + sToken1.length;
	var iToken2 = sReport.indexOf( sToken2, iToken1 );
	var sSlice = sReport.slice( iToken1, iToken2 );
	
	console.log( sToken1, sToken1.length, sToken2, iToken1, iToken2, ":" );
	console.log( "Slice: ***", sSlice, "***" );

	//
	//  CLEAN IT UP 
	//
	// console.log( "trimed Slice: ***", sSlice, "***" );
	// console.log( "Length:", sSlice.length );
	// console.log( "" );
	
	
	sSlice = cleanString( sSlice );
	
	console.log( "Cleaned Slice: ***", sSlice, "***" );
	// console.log( "Length:", sSlice.length );
	console.log( "" );
	return sSlice;
}

//
//  
function readTokens( sReport, iToken = -1 ){
	var sSlice;

	/* for( var i=0;  i<tokens.length-1; i++ ){
	//	console.log( tokens1[i], tokens1[i+1]);
		sSlice = findSlice( sReport, tokens[i], tokens[i+1] );
	}
	 */	
	if( iToken >= 0 ){
	sSlice = findSlice( sReport, dataFields.tokens[iToken], dataFields.tokens[iToken+1] );
	} 
	else {
		//
		// Read all the tokens in the file
		//
		for( var i=2;  i<dataFields.tokens.length-1; i++ ){
		//	console.log( tokens1[i], tokens1[i+1]);
			sSlice = findSlice( sReport, dataFields.tokens[i], dataFields.tokens[i+1] );
		}
	}
}

function updateReportDB( dbReports, sAccessionNo ) {
	var sFileName = "../reports/Res. Rpts. Founding Collection " + sAccessionNo + ".doc";
	
	//
	// Read the word document
	//
	var sReport = fs.readFileSync( sFileName, {encoding: 'utf8' } );

	console.log( "read ", sReport.length, "bytes from ",  sFileName );

	//
	//  Trim off the garbage at the top 
	//
	const sHeader = "Research Reports \rFounding Collection, HVACR Heritage Centre Canada";
	sReport = sReport.slice( sReport.indexOf( sHeader ), sReport.length );
	
	readTokens( sReport, 4 );
}

function dbCallback( err, row ){
	if( err ){
		throw err;
	}
	
	updateReportDB( db, row.AccessionNo );
}
	

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite')
let sql = "SELECT DISTINCT AccessionNo FROM report ORDER BY AccessionNo";

db.each( sql, [], dbCallback );

db.close();


//
// test it 
//

// updateReportDB( db, "2003.001" );
// for( var i=1;  i<dataFields.tokens.length-1; i++ ){
	// console.log( dataFields.tokens[i], dataFields.fields[i]);
// }

