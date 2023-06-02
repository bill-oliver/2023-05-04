//
//  Creates classification table in the report db
//
"use strict";
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('reports.sqlite');

console.log('Connected to the database.');

db.run("INSERT INTO Classifications (Code, Description) VALUES('1.01', 'Unitary Refrig and A/C Equipment and Systems - Household Cabinet Refrigerators')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('1.02', 'Unitary Refrig. and A/C Equipment and Systems - Household Air Conditioners')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('1.03', 'Unitary Refrig and A/C Equipment and Systems - Commercial Refrigerating Equipment')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('10.02', 'Solid Fuel (Coal and Wood) Burning Equipment - Water Heating')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('10.06', 'Solid Fuel (Coal and Wood) Burning Equipment - Fuel flow, Ignition and  Combustion Controls')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('10.08', 'Solid Fuel (Coal and Wood) Burning Equipment - Other Components and Parts')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('11.01', 'Vaporizing Oil Burning Equipment and Systems - Burners')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('11.03', 'Vaporizing, Liquid Fuel Burning Equipment and Systems - Space Heating')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.01', 'Pressure Atomizing Oil Burner Equipment and Systems - Burners')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.05', 'Pressure Atomizing Oil Burner Equipment and Systems - Firing Assemblies')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.06', 'Pressure Atomizing Oil Burner Equipment and Systems - Fuel Pump Assemblies')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.07', 'Pressure Atomizing Oil Burner Equipment and Systems - Ignition Devices')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.08', 'Pressure Atomizing Oil Burner Equipment and Systems - Fuel Flow and Combustion Controls')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.09', 'Pressure Atomizing Oil Burner Equipment and Systems - Automatic Temperature Controls')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.10', 'Pressure Atomizing Oil Burner Equipment and Systems - Room Temperature Thermostats')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.11', 'Pressure Atomizing Oil Burner Equipment and Systems - Other Components and Parts')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('12.12', 'Pressure Atomizing Oil Burner Equipment and Systems - Installation, Test and Repair')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('14.02', 'Electric Heating Equipment - Water Heating')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('14.03', 'Electric Heating Equipment - Space Heating')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('14.05', 'Electric Heating Equipment - Room Temperature Thermostats')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('15.02', 'Ventilation Equipment and Systems - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.01', 'Electric Motors - Single Phase, Repulsion Induction and Repulsion Motors')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.02', 'Electric Motors - Single Phase Capacitor Start and Capacitor Run Motors')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.03', 'Electric Motors - Single Phase, Split Phase')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.04', 'Electric Motors - Single Phase, Shaded Pole and Universal')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.06', 'Electric Motors - Components and Parts')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.07', 'Electric Motors - Installation, Test and Repair')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('16.08', 'Electric Motors - NEC')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('2.01', 'Refrigerating and Air Conditioning Evaporators - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('2.02', 'Refrigerating and Air Conditioning Evaporators - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('3.01', 'Refrigerant Flow Controls - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('3.02', 'Refrigerant Flow Controls - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('3.03', 'Refrigerant Flow Controls - NEC')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('4.01', 'Refrigerating and Air Conditioning Condensing Units - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('4.02', 'Refrigerating and Air Conditioning Condensing Units - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('5.01', 'Refrigerating and Air Conditioning Compressors - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('5.02', 'Refrigerating and Air Conditioning Compressors - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('6.01', 'Refrigerating and Air Conditioning Condensers and Receivers - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('6.02', 'Refrigerating and Air Conditioning Condensers and Receivers - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('7.01', 'Refrigerating and Air Conditioning Pressure and Temperature Controls - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('7.02', 'Refrigerating and Air Conditioning Pressure and Temperature Controls - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('8.01', 'Other Refrigerating and Air conditioning Components and Parts - Household')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('8.02', 'Other Refrigerating and Air conditioning Components and Parts - Commercial')" );
db.run("INSERT INTO Classifications(Code, Description) VALUES('8.03', 'Other Refrigerating and Air conditioning Components and Parts - NEC')" );

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});

