const fs = require('fs');
const router = require('express').Router();
const db = require('../db/db.json');

const uuidv1 = require('uuid/v1');

//GET route for notes
router.get('/notes', (req, res) => {
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if(err) {
            res.json(err);
        } else {
            const noteArray = JSON.parse(data);
            res.json(notes);
        }
    })
})

//POST for getting a new note to save
router.post('/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv1()
        }
        fs.readFile(`./db/db.json`, (err, data) => {
            if(err) {
                res.json(err);
            } else {
                const noteArray = JSON.parse(data);
                if (!notes) {
                    noteArray = [];
                }
            noteArray.push(newNote);
            const noteData = JSON.stringify(noteArray);
            fs.writeFile(`./db/db.json`, noteData, (err) => {
                if(err) {
                    res.json(err);
                } else {
                    const response = {
                        status: 'success',
                        body: newNote
                }
                res.json(response)
                console.log(response)
            }
            })
            }
        })
    } else {
        res.json(err);
        console.log('Could not create note')
    }
});

//delete route
router.delete('/notes/:id', (req, res) => {
    fs.readFile(`./db/db.json`, (err, data) => {
        if(err) {
            res.json(err)
        } else {
            const noteArray = JSON.parse(data)
            if (!noteArray) {
                console.log('no notes')
            }
            let newNoteArray = noteArray.filter(note => note.id !== req.params.id);
            const noteData = JSON.stringify(newNoteArray);
            fs.writeFile(`./db/db.json`, noteData, (err) => {
                if(err) {
                    res.json(err)
                } else {
                    const response = {
                        status: 'success',
                    }
                }
            })
        }
    })
    res.send('note delete requested')
})

module.exports = router;