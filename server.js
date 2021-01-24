require('dotenv').config();
const middlewares = require('./middlewares/middlewares');
const userDao = require('./dao/userDao');
const express = require("express"), app = express();

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

    let user = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
    }

    //todo create user model
    console.log(fullName)
    console.log(email)
    console.log(phone)
    console.log(password)
    console.log(repeatPassword)

    await userDao.createUser(user);
})
