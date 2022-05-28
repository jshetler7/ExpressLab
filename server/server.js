const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
let fs = require('fs');
let app = express();

const dataPath = path.join(__dirname, '../form.json');

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.post('/formSubmitted', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.answer);
    const typedStuff = {
        name: req.body.name,
        answer: req.body.answer
    };
    res.send('Thanks for submitting!');
    fs.writeFileSync(dataPath, JSON.stringify(typedStuff));
});

app.get('/formSubmissions', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if (err) return res.send('Unable to show that uWu')

        res.send(JSON.parse(data));
    });
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);