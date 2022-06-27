const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
const port = 5000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/get', (req, res) => {
    res.send('get 정보 전달 잘 됨.')
});

app.post('/post', (req, res) => {
    res.send(`<span>${req.body.id}</span><p></p><span>${req.body.pwd}</span>`)
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});