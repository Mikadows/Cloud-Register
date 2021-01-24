require('dotenv').config();
var bodyParser = require('body-parser')
var express = require("express"), app = express()
const Cloudant = require('@cloudant/cloudant');
const vcap = require('./config/vcap-local.json');
var middlewares = require('./middlewares/middlewares');

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

app.post('/create_user', middlewares.parseData, function(req, res){
    var fullname = req.body.fullname
    var email = req.body.email
    var phone = req.body.phone
    var password = req.body.password
    var repeatPassword = req.body.repeatPassword

    //todo create user model
    console.log(fullname)
    console.log(email)
    console.log(phone)
    console.log(password)
    console.log(repeatPassword)
})
