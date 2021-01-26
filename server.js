require('dotenv').config();
const middlewares = require('./middlewares/middlewares');
const userDao = require('./dao/userDao');
const express = require("express"), app = express();
const AWS = require('aws-sdk');


app.use(express.static(__dirname + "/public"));

//start the app
var port = process.env.PORT || process.env.LOCAL_PORT;
app.listen(port, () => console.log('listening on port', port));

app.post('/create_user', middlewares.parseData, async function(req, res){
    const fullName = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const country = req.body.countryCode;

    let user = {
        fullName: fullName,
        email: email,
        phone: '+' + country + phone,
        password: password,
    }

    console.log(user.fullName)
    console.log(user.email)
    console.log(user.phone)
    console.log(user.password)

    await userDao.createUser(user).catch(() => {
        res.status(500).json("{message: Creation failed}")
    });

    const params = {
        Message: `Bonjour ${user.fullName} votre compte à bien été enregistré !`,
        PhoneNumber: user.phone,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'CloudPrj'
            }
        }
    };

    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            console.log(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
        function (err) {
            console.log(JSON.stringify({ Error: err }));
            res.status(500).json("{message: Account Created but SMS failed}")
        });

    res.status(201).json("{message: User Created}")
})
