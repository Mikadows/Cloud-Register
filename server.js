var express = require("express"),
    app = express()

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(express.static(__dirname + "/public"));

//start the app
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('listening on port', port);
});


// require("cf-deployment-tracker-client").track();