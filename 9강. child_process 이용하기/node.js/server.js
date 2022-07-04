const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
const spawn = require('child_process').spawn;
const iconv = require('iconv-lite');
let num1 = 10
let num2 = 10
const result = spawn('python', ['test.py', num1, num2]);
let rs
const port = 5000

result.stdout.on('data', function (data) {
    rs = iconv.decode(data, 'euc-kr');
    console.log(rs);
});
result.stderr.on('data', function (data) {
    rs = iconv.decode(data, 'euc-kr');
    console.log(rs);
});

app.get('/', (req, res) => {

    res.render('index', {number: rs});
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});