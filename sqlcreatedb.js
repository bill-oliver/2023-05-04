const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


//db.run('CREATE TABLE report ("ID" INTEGER, "AccessionNo"	TEXT, "Classification"	TEXT, "LastModified"	TEXT, "Group"	TEXT, "FilmImage"	TEXT, "DigitalImage"	TEXT, "Make"	TEXT, "Manufacturer"	TEXT, "Model"	TEXT, "SerialNo"	TEXT, "Size"	TEXT, "Weight"	TEXT, "Circa"	TEXT, "Rating"	TEXT, "PatentDateNumber"	TEXT, "Provenance"	TEXT, "TypeandDesign"	TEXT, "Construction"	TEXT, "Material"	TEXT, "SpecialFeatures"	TEXT, "Accessories"	TEXT, "Capacities"	TEXT, "PerformanceCharacteristics"	TEXT, "Operation"	TEXT, "ControlandRegulation"	TEXT, "TargetedMarketSegment"	TEXT, "ConsumerAcceptance"	TEXT, "Merchandising"	TEXT, "MarketPrice"	TEXT, "TechSignificance"	TEXT, "IndSignificance"	TEXT, "EconSignificance"	TEXT, "CultSignificance"	TEXT, "Donor"	TEXT, "StorageLocation"	TEXT, "Tracking"	TEXT, "BiblioRef"	TEXT, "Notes"	TEXT, "RelatedReports"	TEXT )');

db.run('CREATE TABLE xref ("ID" INTEGER, "AccessionNo"	TEXT, "Classification"	TEXT )');


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});

