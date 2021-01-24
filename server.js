require('dotenv').config();
var express = require("express"), app = express()
const Cloudant = require('@cloudant/cloudant');
const vcap = require('./config/vcap-local.json');

dbCloudantConnect();

app.use(express.static(__dirname + "/public"));

//start the app
var port = process.env.PORT || process.env.LOCAL_PORT;
app.listen(port, () => console.log('listening on port', port));



/**
 * Connects to the Cloudant DB
 * @return {Promise} - when resolved, contains the db, ready to go
 */
function dbCloudantConnect() {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            url: vcap.services.cloudantNoSQLDB.credentials.url
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant DB: ' +
                    process.env.CLOUDANT_DB_NAME);
                reject(err);
            } else {
                let db = cloudant.use(process.env.CLOUDANT_DB_NAME);
                console.log('Connect success! Connected to DB: ' + process.env.CLOUDANT_DB_NAME);
                resolve(db);
            }
        }));
    });
}