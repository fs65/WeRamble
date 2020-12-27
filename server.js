const { Connection, Request } = require("tedious");
const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const Joi = require('joi')
// const bodyParser = require("body-parser");
// const { ClippingRectangle } = require("react-native");

const app = express();
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "build")))

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "callum", // update me
            password: "0089fxcy?" // update me
        },
        type: "default"
    },
    server: "weramble.database.windows.net", // update me
    options: {
        database: "weramble", //update me
        encrypt: true
    }
};

const connection = new Connection(config);


// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Azure SQL Connected...");
    }
});

function queryDatabase(req, res, query) {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        query,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        res.json(columns);
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}

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

//listen
let server = app.listen('80', (err) => {
    if (err) throw err;
    else console.log(`Server started on port 80`);
});