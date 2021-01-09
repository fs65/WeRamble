const { queryDatabase } = require("./azure.js");
const { sendVerificationEmail } = require("./emailer.js")
const { port } = require("../utils.js")
const { quote } = require("../utils.js");
const express = require('express');
const path = require('path');
const fs = require('fs');
const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');
const { v1: uuid } = require('uuid');
var bodyParser = require('body-parser')
const readFile = (file) => { return fs.readFileSync(path.resolve(__dirname, file), { encoding: "UTF-8" }) };

const app = express();
app.use(bodyParser({ limit: '50mb' }));

var jsonParser = bodyParser.json()

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=weramble;AccountKey=vTiBSla5pbWA0zxj3YTbAhjtDQcs2SPJ/XgKB44TjMPnKmBbW1CcX853ZGzduApqU58TjIAy9WKDbQ5HyBrgMA==;EndpointSuffix=core.windows.net'

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
    sendVerificationEmail();
});

//feed
app.get('/api/feed', (req, res) => {
    let query = readFile("sql/feed.sql")
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

//upload
app.post('/api/upload', jsonParser, (req, res) => {
    // console.log(req.body.file)
    const file = req.body.file
    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Create a unique name for the container
    const containerName = 'images';

    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container
    // const createContainerResponse = containerClient.create();
    // console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
    let test = JSON.stringify("IM FROM API")
    // Create a unique name for the blob
    const blobName = 'test.jpg';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    const data = file;
    const uploadBlobResponse = blockBlobClient.upload(data, data.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
    res.json(test)
    // queryDatabase(req, res, query);
});

//listen
app.listen(port, (err) => {
    if (err) throw err;
    else console.log(`Server started on port ${port}`);
});