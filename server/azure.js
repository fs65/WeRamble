
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
        let results = [];
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
            console.log(columns.length);
            let chunk = {};
            columns.forEach(column => {
                let key = column.metadata.colName
                let value = column.value
                // console.log("%s\t%s", key, value);
                chunk[key] = value;
            });
            results.push(chunk);
            console.log(chunk)
        });

        request.on("requestCompleted", columns => {
            if (results.length > 0)
                res.json(results);
            else res.json(false);
        });

        connection.execSql(request);
    }
}

