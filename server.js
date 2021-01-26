require('dotenv').config();
const middlewares = require('./middlewares/middlewares');
const userDao = require('./dao/userDao');
const express = require("express"), app = express();
const AWS = require('aws-sdk');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET
});

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

    await sendMailTo(user)

    res.redirect('/picture')
    // res.status(201).json("{message: User Created}")
})

app.get('/picture', async (req, res) => {
    res.sendFile(__dirname + "/public/picture.html")
})

app.post('/uploadPic', upload.single('photo'), async (req, res) => {
//
    if (req.file) {
        console.log('Uploaded: ', req.file);
        uploadFile(req.file)
        res.status(201).json("{message: File uploaded}")
    } else {
        res.status(404).json("{message: File not found}")
    }
})

const uploadFile = (file) => {

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'my-storage-cours-esgi',
        Key: file.originalname, // File name you want to save as in S3
        Body: file.buffer
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const sendMailTo = (user) => {
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [user.email] // Email address/addresses that you want to send your email
        },
        ConfigurationSetName: "TestSet",
        Message: {
            Body: {
                Html: {
                    // HTML Format of the email
                    Charset: "UTF-8",
                    Data:
                        `<html><body><h1>Hello ${user.fullName}</h1><p style='color:red'>You received this email from SES !</p> </body></html>`
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Hello ${user.fullName} You received this email from SES !`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Cloud Project - ESGI"
            }
        },
        Source: process.env.AWS_SOURCE_MAIL
    };

    const sendEmail = ses.sendEmail(params).promise();

    sendEmail
        .then(data => {
            console.log("email submitted to SES", data);
        })
        .catch(error => {
            console.log(error);
        });
}