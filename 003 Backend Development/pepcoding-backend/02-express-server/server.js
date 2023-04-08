const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
})

app.get((req, res) => {
    res.sendFile('./views/error_page.html', { root: __dirname });
})

app.get('/about_me', (req, res) => {
    res.redirect('/about');
})

app.use((req, res) => {
    res.status(404)
        .sendFile('./views/error_page.html', { root: __dirname });
})

app.listen(PORT);