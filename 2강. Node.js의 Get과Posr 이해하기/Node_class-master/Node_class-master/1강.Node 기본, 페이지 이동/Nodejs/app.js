const express = require('express'); 

const app = express(); 

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 

app.get('/', (req, res) => { 
        res.send(` <form action="/" method="post">
        <input type="text" name="text" placeholder="적고 싶은 내용을 적어주세요." style="width:200px; height:50px;">
        <input type="submit" name="submit" value="제출"> 
        </form> `); 
    }); 

app.post('/', (req, res) => { 
    var text = req.body.text
    console.log("text : ", text);
    res.send( 
        `<h1>당신이 적은 내용은...</h1>
        <p><i>${text}</i></p>`
    ) //알림창이 뜨면서 확인 클릭 시 "localhost:3000/"으로 이동 ); 
}); 

app.listen(8888, () => { console.log('서버 실행중...'); });
