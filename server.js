require('dotenv').config();
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
