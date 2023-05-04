var fs = require('fs');
var a = fs.readdirSync("reports");
for( let i=0; i<a.length; i++)
{
	console.log( "processing:", a[i]);
}


