const fs = require("fs");

fs.stat("Infomation.json", (err, stats) => {
    if (err) console.log(err)
    else console.log('파일 찾음')
    
})