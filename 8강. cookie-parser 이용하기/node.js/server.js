const express = require('express');
const app = express();
const port = 5000;
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/cookie', (req, res) => {
    const text = req.body.text;
    res.cookie('Text', text);
    console.log(req.cookies.Text)
    res.render('Cookie', {'text': text});
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});