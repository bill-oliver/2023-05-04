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
			throw new Error( "***** Unexpected char " + sChar.charCodeAt( 0 ) 
							+ " at postion " + i + " in slice: \n" + sIn );
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
	let sSlice = sReport.slice( iToken1, iToken2 );
	
	// console.log( sToken1, sToken1.length, sToken2, iToken1, iToken2, ":" );
	// console.log( "Slice: ***", sSlice, "***" );
	
	if( iToken1 < 0 ){
		throw new Error( "Token " + sToken1 + " not found " );      //  **** ERROR ****
	}
	else if( iToken2 < 0 ){
		throw new Error( "Token " + sToken2 + " not found " );      //  **** ERROR ****
	}

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
	return sSlice;
}

//
//  readTokens - function
//  ----------
//
//  returns the block of text corresponding to tokens in the file
//
//  dbReports - reports database object 
//  sReport - string containing report text
//  iToken - index (in dataFields) of token to be found, 
//           if omitted all tokens are retreived
//
function readTokens( dbReports, sAccessionNo, sReport, iToken = -1 ){
	let sSlice;

	/* for( let i=0;  i<tokens.length-1; i++ ){
	//	console.log( tokens1[i], tokens1[i+1]);
		sSlice = findSlice( sReport, tokens[i], tokens[i+1] );
	}
	 */	
	let sSQL = "UPDATE report SET ";
	if( iToken >= 0 ){
		sSlice = findSlice( sReport, dataFields.tokens[iToken], dataFields.tokens[iToken+1] );
		sSQL += dataFields.fields[ iToken ] + "='" + sSlice + "',";
	} 
	else {
		//
		// Read all the tokens in the file
		//
		for( let i=2;  i<dataFields.tokens.length-1; i++ ){
		//	console.log( tokens1[i], tokens1[i+1]);
			sSlice = findSlice( sReport, dataFields.tokens[i], dataFields.tokens[i+1] );
			sSQL += " " + dataFields.fields[ i ] + "='" + sSlice + "',";
		}
	}
	
	sSQL = sSQL.slice( 0, sSQL.length - 1 );   // REMOVE TERMINATING ","
	sSQL += " WHERE AccessionNo = " + sAccessionNo + ";";
	
	console.log( "SQL:", sSQL, "\n\n\n" );
	
	db.run( sSQL, [], function(err) {
		if (err) {
			throw(err);
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
function updateReportDB( dbReports, sAccessionNo ) {
	let sFileName = "../reports/Res. Rpts. Founding Collection " + sAccessionNo + ".doc";
	
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

	readTokens( dbReports, sAccessionNo, 
	            sReport.slice( iOffset ), 4 );  	// Test one token only
	// readTokens( dbReports, sAccessionNo, 
	            // sReport.slice( iOffset ) );  		// All tokens
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
	
	updateReportDB( db, row.AccessionNo );
}
	
//
//  Main
//  ----
//
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite')
let sql = "SELECT DISTINCT AccessionNo FROM report ORDER BY AccessionNo";

try {
	// db.each( sql, [], dbCallback );
	updateReportDB( db, "2006.002" );  // *****TEST ONE REPORT
}
catch( e ) {
	console.error( e.name );
	console.error( e.message );
}

db.close();

