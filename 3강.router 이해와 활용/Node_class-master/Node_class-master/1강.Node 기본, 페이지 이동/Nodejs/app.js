const express = require('express'); 
const http = require("http");
const app = express(); 

const router = express.Router();
const post = require('./router/post')
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/post_page', post);

app.get('/', (req, res) => { 
        res.sendFile(__dirname + '/template/index.html'); 
    });

app.listen(8888, () => { console.log('서버 실행중...'); });
