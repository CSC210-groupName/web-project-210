var mysql = require('mysql');
var express = require('express');
var fs = require('fs');

var secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf-8'));


// Set up database connection
var connection = mysql.createConnection({
	// TO set up to work with password, need to get into mysql shell after installing it separately and run:
	// Create USER 'XXXX'@'localhost' IDENTIFIED WITH mysql_native_password BY 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
	host: 'localhost',
	user: secrets.mysqlUsername,
	password: secrets.mysqlPassword,
	database: 
});

connection.connect(function(err){
	if(err) throw err;
	console.log('Successfully connected.');
});

