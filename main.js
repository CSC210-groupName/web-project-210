var mysql = require('mysql');


// Set up connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'testing',
	password: '12345678'

});

connection.connect(function(err){
	if(err) throw err;
	console.log('Successfully connected.');
});

