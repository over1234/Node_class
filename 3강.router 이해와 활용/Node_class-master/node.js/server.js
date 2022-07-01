const express = require('express');
const app = express();
const post = require('./router/routs')
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/post_page', post);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});