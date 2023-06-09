//
//  create xref table to cross reference report classification with accession numbers
//
//  ****** WARNING! - there are errors in this e.g. 2003.072


const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


//db.run('CREATE TABLE report ("ID" INTEGER, "AccessionNo"	TEXT, "Classification"	TEXT, "LastModified"	TEXT, "Group"	TEXT, "FilmImage"	TEXT, "DigitalImage"	TEXT, "Make"	TEXT, "Manufacturer"	TEXT, "Model"	TEXT, "SerialNo"	TEXT, "Size"	TEXT, "Weight"	TEXT, "Circa"	TEXT, "Rating"	TEXT, "PatentDateNumber"	TEXT, "Provenance"	TEXT, "TypeandDesign"	TEXT, "Construction"	TEXT, "Material"	TEXT, "SpecialFeatures"	TEXT, "Accessories"	TEXT, "Capacities"	TEXT, "PerformanceCharacteristics"	TEXT, "Operation"	TEXT, "ControlandRegulation"	TEXT, "TargetedMarketSegment"	TEXT, "ConsumerAcceptance"	TEXT, "Merchandising"	TEXT, "MarketPrice"	TEXT, "TechSignificance"	TEXT, "IndSignificance"	TEXT, "EconSignificance"	TEXT, "CultSignificance"	TEXT, "Donor"	TEXT, "StorageLocation"	TEXT, "Tracking"	TEXT, "BiblioRef"	TEXT, "Notes"	TEXT, "RelatedReports"	TEXT )');

db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.001", 1, "1.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.002", 2,	 "1.01-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.003", 3,	 "1.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.004", 4,	 "1.01-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.005", 5,	 "1.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.006", 6,	 "1.01-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.007", 7,	 "1.01-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.008", 8,	 "1.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.009", 9,	 "1.03-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.010", 10,	 "8.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.011", 11,	 "2.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.012", 12,	 "2.01-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.013", 13,	 "2.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.014", 14,	 "2.01-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.015", 15,	 "2.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.016", 16,	 "2.01-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.017", 17,	 "2.01-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.018", 18,	 "2.01-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.019", 19,	 "2.01-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.020", 20,	 "2.01-13" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.021", 21,	 "2.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.022", 22,	 "2.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.023", 23,	 "2.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.024", 24,	 "2.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.025", 25,	 "2.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.026", 26,	 "2.02-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.027", 27,	 "2.02-7A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.028", 28,	 "2.02-7B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.029", 29,	 "2.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.030", 30,	 "4.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.031", 31,	 "4.01-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.032", 32,	 "4.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.033", 33,	 "4.01-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.034", 34,	 "4.01-6A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.035", 35,	 "4.01-6B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.036", 36,	 "4.01-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.037", 37,	 "4.01-7A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.038", 38,	 "4.01-7B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.039", 39,	 "4.01-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.040", 40,	 "4.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.041", 41,	 "4.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.042", 42,	 "4.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.043", 43,	 "4.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.044", 44,	 "4.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.045", 45,	 "4.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.046", 46,	 "4.02-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.047", 47,	 "4.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.048", 48,	 "4.02-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.049", 49,	 "4.02-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.050", 50,	 "4.02-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.051", 51,	 "4.02-13" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.052", 52,	 "4.02-14" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.053", 53,	 "4.02-15" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.054", 54,	 "4.02-16" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.055", 55,	 "4.02-17" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.056", 56,	 "4.02-18" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.057", 57,	 "4.02-19" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.058", 58,	 "4.02-20" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.059", 59,	 "4.02-21" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.060", 60,	 "6.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.061", 61,	 "6.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.062", 62,	 "6.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.063", 63,	 "6.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.064", 64,	 "6.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.065", 65,	 "6.02-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.066", 66,	 "6.01-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.067", 67,	 "6.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.068", 68,	 "6.01-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.069", 69,	 "6.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.070", 70,	 "6.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.071", 71,	 "8.01-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.072", 72,	 "8.02-3" )' ); // WRONG!!! SHOULD BE 8.02-1
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.073", 73,	 "8.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.074", 74,	 "8.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.075", 75,	 "8.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.076", 76,	 "8.03-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.077", 77,	 "8.03-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.078", 78,	 "8.03-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.079", 79,	 "12.01-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.080", 80,	 "12.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.081", 81,	 "10.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.082", 82,	 "11.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.083", 83,	 "14.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.084", 84,	 "14.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.085", 85,	 "15.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.086", 86,	 "15.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.087", 87,	 "5.01-1A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.088", 88,	 "5.01-1B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.089", 89,	 "5.01-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.090", 90,	 "5.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.091", 91,	 "5.01-5A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.092", 92,	 "5.01-5B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.093", 93,	 "5.01-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.094", 94,	 "5.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.095", 95,	 "5.01-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.096", 96,	 "5.01-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.097", 97,	 "5.01-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.098", 98,	 "5.01-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.099", 99,	 "5.01-13" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.100", 100, 	"5.01-17" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.101", 101, 	"5.01-18" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.102", 102, 	"5.01-19" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.103", 103, 	"5.01-20" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.104", 104, 	"5.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.105", 105, 	"5.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.106", 106, 	"5.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.107", 107, 	"5.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.108", 108, 	"5.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.109", 109, 	"5.02-6A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.110", 110, 	"5.02-6B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.111", 111, 	"5.02-6C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.112", 112, 	"5.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.113", 113, 	"5.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.114", 114, 	"5.02-9A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.115", 115, 	"5.02-9B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.116", 116, 	"5.02-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.117", 117, 	"5.02-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.118", 118, 	"5.02-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.119", 119, 	"5.02-13" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.120", 120, 	"5.02-14A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.121", 121, 	"5.02-14B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.122", 122, 	"5.02-15" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.123", 123, 	"5.02-16" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2003.124", 124, 	"5.02-17" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.001", 125, 	"7.01-1A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.002", 126, 	"7.01-1B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.003", 127, 	"7.01-1C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.004", 128, 	"7.01-1D" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.005", 129, 	"7.01-2A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.006", 130, 	"7.01-2B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.007", 131, 	"7.01-3A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.008", 132, 	"7.01-3B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.009", 133, 	"7.01-3C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.010", 134, 	"7.01-3D" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.011", 135, 	"7.01-3E" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.012", 136, 	"7.01-3F" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.013", 137, 	"7.01-3G" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.014", 138, 	"7.01-2C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.015", 139, 	"7.01-2D" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.016", 140, 	"7.01-2E" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.017", 141, 	"7.01-2F" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.018", 142, 	"7.01-4A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.019", 143, 	"7.01-4B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.020", 144, 	"7.01-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.021", 145, 	"7.01-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.022", 146, 	"7.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.023", 147, 	"7.01-8A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.024", 148, 	"7.01-8B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.025", 149, 	"7.01-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.026", 150, 	"7.01-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.027", 151, 	"7.01-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.028", 152, 	"7.02-1A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.029", 153, 	"7.02-1B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.030", 154, 	"7.02-1C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.031", 155, 	"7.02-1D" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.032", 156, 	"7.02-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.033", 157, 	"7.02-3A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.034", 158, 	"7.02-3B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.035", 159, 	"7.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.036", 160, 	"7.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.037", 161, 	"7.02-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.038", 162, 	"7.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.039", 163, 	"7.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.040", 164, 	"7.02-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.041", 165, 	"3.01-1A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.042", 166, 	"3.01-1B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.043", 167, 	"3.01-1C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.044", 168, 	"3.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.045", 169, 	"3.01-3A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.046", 170, 	"3.01-3B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.047", 171, 	"3.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.048", 172, 	"3.01-5A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.049", 173, 	"3.01-5B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.050", 174, 	"3.01-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.051", 175, 	"3.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.052", 176, 	"3.01-8 " )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.053", 177, 	"3.01-9A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.054", 178, 	"3.01-9B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.055", 179, 	"3.01-10A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.056", 180, 	"3.01-10B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.057", 181, 	"3.01-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.058", 182, 	"3.01-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.059", 183, 	"3.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.060", 184, 	"3.02-2A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.061", 185, 	"3.02-2B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.062", 186, 	"3.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.063", 187, 	"3.02-4A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.064", 188, 	"3.02-4B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.065", 189, 	"3.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.066", 190, 	"3.02-6A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.067", 191, 	"3.02-6B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.068", 192, 	"3.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.069", 193, 	"3.03-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.070", 194, 	"3.03-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.071", 195, 	"3.03-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.072", 196, 	"3.03-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.073", 197, 	"3.03-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.074", 198, 	"3.03-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.075", 199, 	"3.03-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.076", 200, 	"3.03-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.077", 201, 	"3.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.078", 202, 	"3.02-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.079", 203, 	"3.02-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.080", 204, 	"3.02-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.081", 205, 	"3.02-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.082", 206, 	"3.02-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.083", 207, 	"3.02-13" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.084", 208, 	"3.02-14" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.085", 209, 	"3.02-15" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.086", 210, 	"8.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.087", 211, 	"8.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.089", 213, 	"12.10-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.090", 214, 	"12.10-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.091", 215, 	"12.10-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.092", 216, 	"12.10-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.093", 217, 	"12.10-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.094", 218, 	"12.10-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.095", 219, 	"12.10-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.096", 220, 	"12.10-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.097", 221, 	"14.05-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.098", 222, 	"12.11-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.099", 223, 	"12.11-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.100", 224, 	"14.03-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.101", 225, 	"10.06-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.102", 226, 	"12.08-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.103", 227, 	"12.08-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.104", 228, 	"12.08-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.105", 229, 	"12.08-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.106", 230, 	"12.08-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.107", 231, 	"12.08-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.108", 232, 	"12.08-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.109", 233, 	"12.08-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.110", 234, 	"12.08-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.111", 235, 	"12.08-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.112", 236, 	"12.08-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.113", 237, 	"12.09-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.114", 238, 	"12.09-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.115", 239, 	"12.09-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.116", 240, 	"12.11-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.117", 241, 	"12.11-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.118", 242, 	"12.11-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.119", 243, 	"12.11-4A&B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.120", 244, 	"12.11-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.121", 245, 	"12.11-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.122", 246, 	"12.11-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.123", 247, 	"12.11-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.124", 248, 	"12.12-1A&B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.125", 249, 	"12.12.2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.126", 250, 	"12.12-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.127", 251, 	"12.12-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.128", 252, 	"12.12-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.129", 253, 	"12.12-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.130", 254, 	"12.12-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.131", 255, 	"12.07-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.132", 256, 	"12.07-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.133", 257, 	"12.07-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.134", 258, 	"12.07-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.135", 259, 	"12.05-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.136", 260, 	"12.05-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.137", 261, 	"12.05-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.138", 262, 	"12.05-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.139", 263, 	"12.05.5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.140", 264, 	"12.05-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.141", 265, 	"12.05-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.142", 266, 	"12.06-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.143", 267, 	"12.06-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.144", 268, 	"12.06-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.145", 269, 	"12.06-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.146", 270, 	"12.06-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.147", 271, 	"12.06-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.148", 272, 	"12.06-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.149", 273, 	"12.06-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.150", 274, 	"12.06-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.151", 275, 	"12.06-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.152", 276, 	"12.06-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.153", 277, 	"12.06-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.154", 278, 	"11.01-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.155", 279, 	"10.08-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.156", 280, 	"16.02-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.157", 281, 	"16.02-2A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.158", 282, 	"16.02-2B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.159", 283, 	"16.02-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.160", 284, 	"16.02-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.161", 285, 	"16.02-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.162", 286, 	"16.02-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.163", 287, 	"16.02-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.164", 288, 	"16.03-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.165", 289, 	"16.03-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.166", 290, 	"16.03-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.167", 291, 	"16.03-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.168", 292, 	"16.03-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.169", 293, 	"16.01-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.170", 294, 	"16.01-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.171", 295, 	"16.01-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.172", 296, 	"16.01-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.173", 297, 	"16.01-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.174", 298, 	"16.01-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.175", 299, 	"16.01-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.176", 300, 	"16.01-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.177", 301, 	"16.01-10A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.178", 302, 	"16.01-10B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.179", 303, 	"16.01-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.180", 304, 	"16.01-12" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.181", 305, 	"16.01-13A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.182", 306, 	"16.01-13B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.183", 307, 	"16.01-13C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.184", 308, 	"16.01-14" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.185", 309, 	"16.01-15" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.186", 310, 	"16.01-16" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.187", 311, 	"16.04-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.188", 312, 	"16.04-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.189", 313, 	"16.04-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.190", 314, 	"16.04-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.191", 315, 	"16.04-5A" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.192", 316, 	"16.04-5B" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.193", 317, 	"16.04-5C" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.194", 318, 	"16.04-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.195", 319, 	"16.04-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.196", 320, 	"16.04-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.197", 321, 	"16.04-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.198", 322, 	"16.04-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.199", 323, 	"16.08-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.200", 324, 	"16.08-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.201", 325, 	"16.08-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.202", 326, 	"16.06-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.203", 327, 	"16.06-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.204", 328, 	"16.06-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.205", 329, 	"16.06-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.206", 330, 	"16.06-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.207", 331, 	"16.06-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.208", 332, 	"16.06-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.209", 333, 	"16.07-1" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.210", 334, 	"16.07-2" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.211", 335, 	"16.07-3" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.212", 336, 	"16.07-4" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.213", 337, 	"16.07-5" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.214", 338, 	"16.07-6" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.215", 339, 	"16.07-7" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.216", 340, 	"16.07-8" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.217", 341, 	"16.07-9" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.218", 342, 	"16.07-10" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.219", 343, 	"16.07-11" )' );
db.run('INSERT INTO report(AccessionNo, ID, Classification) VALUES( "2006.220", 344, 	"12.12-8" )' );


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});

