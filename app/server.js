const os = require('os');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.status(200).send(`[${os.hostname()}] Hi, there!`);
});

app.listen(port, function () {
    console.log('listening on port ', port)
});