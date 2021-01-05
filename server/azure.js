
const { Connection, Request } = require("tedious");

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

module.exports = {

    queryDatabase: (req, res, query) => {
        console.log("Reading rows from the Table...");
        // Read all rows from table
        const request = new Request(
            query,
            (err, rowCount) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${rowCount} row(s) returned`);
                    if (rowCount == 0)
                        res.json(false);
                }
            }
        );

        request.on("row", columns => {
            console.log(columns.length);
            res.json(columns);
            columns.forEach(column => {
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
        });

        connection.execSql(request);
    }
}

