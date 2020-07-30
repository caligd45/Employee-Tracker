const inquirer = require("inquirer");
const fs = require("fs");
var mysql = require("mysql");
const util = require("util");

const config = require('./package.json');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ch@rly1985",
    database: "Employee_Tracker"
});