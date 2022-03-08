const express = require('express'); 
const app = express(); 
const router = express.Router();
const post = require('./router/post')

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));
app.use('/upload', post);

app.get('/', (req, res) => { 
        res.sendFile(__dirname + '/template/index.html'); 
    });

app.listen(8888, () => { console.log('서버 실행중...'); });
