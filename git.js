const http = require('http');//모듈을 불러온다.
var url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('qs');


const server = http.createServer((request, response) => {
    const pathUrl = url.parse(request.url, true).pathname; // url에서 path 추출
    if (request.method === 'POST') { // POST 요청이면
        if (pathUrl === '/get_info') {
            var body = '';
            request.on('data', function (data) {
                body = body + data;
                console.log(body)
            });
            request.on('end', function () {
                var post = qs.parse(body);
                console.log(post);
                const filename = path.join(__dirname, '/user.json')
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    const json = JSON.parse(data)
                    const value = json
                    const arr = new Array()

                    arr.push(value, { id: post.id, pw: post.pw })
                    console.log(arr)
                    fs.writeFile(filename, JSON.stringify(arr), 'utf8', (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                });
            });
            response.end('create successful')
        }
    } else if (request.method === 'GET') {
        if (pathUrl === '/read') {
            const filename = path.join(__dirname, '/user.json')
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                response.end(data)
            })
        }
        if (pathUrl === '/read_user') {
            const filename = path.join(__dirname, '/user.json')
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                var parsedUrl = qs.parse(request.url);
                const user = parsedUrl['/read_user?id']
                const json = JSON.parse(data)
                console.log(json[0].user)
                for (var i = 0; i < json.length; i++) {
                    if (json[i].id === user) {
                        response.write(`userID : ${json[i].id}, userPW : ${json[i].pw}`)
                    }
                }
                response.end()
            })
        }
        if (pathUrl === '/create') {
            response.writeHead(200, { 'Content-Type': 'utf8' }); // header 설정
            const filename = path.join(__dirname, '/index.html')
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    response.end(data)
                }
            })
        }

    } else if (request.method === 'PUT') {
        if (pathUrl === '/update') {
            var body = '';
            request.on('data', function (data) {
                body = body + data;
            });
            request.on('end', function () {
                var post = qs.parse(body);
                const filename = path.join(__dirname, '/user.json')
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    const updateId = post.id
                    const updatePw = post.pw
                    const deleteId = post.deleteId
                    console.log(updateId, updatePw)
                    console.log(deleteId)
                    const json = JSON.parse(data)
                    for (var i = 0; i < json.length; i++) {
                        if (json[i].id === deleteId) {
                            delete json[i].id
                            delete json[i].pw
                            json[i].id = updateId
                            json[i].pw = updatePw
                            response.write(`데이터 업데이트 완료`)
                        }
                    }
                    fs.writeFile(filename, JSON.stringify(json), 'utf8', (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                });
            });
            response.end('create successful')
        }

    } else if (request.method === 'DELETE') {
        if (pathUrl === '/delete') {
            const filename = path.join(__dirname, '/user.json')
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                var parsedUrl = qs.parse(request.url);
                const user = parsedUrl['/delete?id']
                const json = JSON.parse(data)
                console.log(json[0].user)
                for (var i = 0; i < json.length; i++) {
                    if (json[i].id === user) {
                        delete json[i].id
                        delete json[i].pw
                        response.write(`데이터 삭제 완료`)
                    }
                }
                fs.writeFile(filename, JSON.stringify(json), 'utf8', (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                response.end()
            })
        }
    }
})

server.listen(80, () => {
    console.log(`http://127.0.0.1:${80}`)
});