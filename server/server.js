const { connect, queryDatabase } = require("./azure.js");
const { quote } = require("../utils.js");
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
connect();

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

    let query = fs.readFileSync(path.join('sql', 'login.sql'), { encoding: "UTF-8" })
        .replace("${username}", quote(username))
        .replace("${email}", quote(username))
        .replace("${password}", quote(password))
    // console.log(query);
    queryDatabase(req, res, query);
});

//listen
let server = app.listen('80', (err) => {
    if (err) throw err;
    else console.log(`Server started on port 80`);
});