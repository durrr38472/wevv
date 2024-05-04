
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
let db;

app.use(bodyParser.json());
app.use(express.static('.'));

MongoClient.connect('mongodb+srv://aba54015:HezrNFEY0rqajneF@mapmap.ohmz6zx.mongodb.net/', { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    db = client.db('markersDB');
    app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.post('/markers', (req, res) => {
    db.collection('markers').insertOne(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result.ops);
    });
});

