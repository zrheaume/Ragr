require('dotenv').config();
const mysql = require('mysql');

var ragrDB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER,
    database: process.env.DB_NAME
});
ragrDB.connect((err)=>{
    if(err) throw err;
    console.log("Conected to ragrDB");
});

module.exports = ragrDB;