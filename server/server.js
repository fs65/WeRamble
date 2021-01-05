const { queryDatabase } = require("./azure.js");
const { port } = require("../utils.js")
const { quote } = require("../utils.js");
const express = require('express');
const path = require('path');
const fs = require('fs');
const readFile = (file) => {return fs.readFileSync(path.resolve(__dirname, file), { encoding: "UTF-8" })};

const app = express();

//test
app.get('/api/test', (req, res) => {
    let query = `select * from weramble.test`;
    queryDatabase(req, res, query);
});

//register
app.get('/api/register/:email/:username/:password', (req, res) => {
    const { email, username, password } = req.params;
    let query = `insert into weramble.users(username, password, email) values ('${username}', '${password}', '${email}');`;
    queryDatabase(req, res, query);
});

//login
app.get('/api/login/:username/:password', (req, res) => {
    const { username, password } = req.params;

    let query = readFile("sql/login.sql") 
        .replace("${username}", quote(username))
        .replace("${email}", quote(username))
        .replace("${password}", quote(password))
    queryDatabase(req, res, query);
});

//listen
app.listen(port, (err) => {
    if (err) throw err;
    else console.log(`Server started on port ${port}`);
});