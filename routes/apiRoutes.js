const fs = require('fs');
const db = require('../db/db.json');
//for generating random id
const uuid = require('uuid')

module.exports = function(app) {
    //get request for api, and catching errors
    app.get('./api/notes', function (req, res) {
        fs.readFile(__dirname + '../db/db.json', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
    //post request for api and catching errors
    app.post('./api/notes', function (req, res) {
        let noteArray =[];
        let noteContent = {
            title: req.body.title,
            description: req.body.description,
            id: uuid.v4()
        }
        fs.readFile(__dirname + '../db/db.json', (err, data) => {
            if (err) throw err;
            noteArray = JSON.parse(data);
            noteArray.push(noteContent);
            fs.writeFile(__dirname + '../db/db.json', JSON.stringify(noteArray), (err) => {
                if (err) throw err;
            })
            res.json(data);
        })
    })
}