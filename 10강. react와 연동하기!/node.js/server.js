const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000

app.use(cors());

app.get('/', (req, res) => {

    res.status(200).json({massage: '연동 잘 됨.'})
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});