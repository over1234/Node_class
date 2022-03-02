var express = require('express')

var app = express()

var port = app.listen(process.env.PORT || 9791);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/template/index.html")
})

app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/template/main.html")
})

app.listen(port, function() {
    console.log('contacting sever...');
})