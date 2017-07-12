const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mysql = require('mysql');
const dbConfig = require('./config/database');
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if(err){
		console.log('error connecting to db');
		return;
	}
	console.log('connection established');
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const dbAdapter = require('./adapters/dbAdapter')(connection);

//========== routes==========
require('./app/routes.js')(app, dbAdapter);


app.listen(port, (err) => {
	if(err) {
		return console.log('something bad happened', err);
	}

	console.log(`server listening on ${port}`);
})



