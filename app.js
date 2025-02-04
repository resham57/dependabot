const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send('Just for test');
});

app.post('/submit-form', (req, res) => {
    res.send('Form submitted');
});

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

module.exports = app;