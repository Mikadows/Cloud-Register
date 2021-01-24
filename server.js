require('dotenv').config();
var bodyParser = require('body-parser');
var middlewares = require('./middlewares/middlewares');
const userDao = require('./dao/userDao');
const express = require("express"), app = express();

let user = {
    fullName: "Jean Valjean2",
    email: "Jean@Valjean.com",
    phone: "+33655555555",
    password: "Toto",
}

userDao.createUser(user);

app.use(express.static(__dirname + "/public"));

//start the app
var port = process.env.PORT || process.env.LOCAL_PORT;
app.listen(port, () => console.log('listening on port', port));

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
