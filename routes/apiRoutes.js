const router = require('express').Router();
const notes = require('../db/notes');

    //get request for api, and catching errors
    router.get('/notes', (req, res) => {
        notes
            .getNote()
            .then((notes) => {
                return res.json(notes);
              })
              .catch((err) => res.status(500).json(err));
    })

    //post request for api and catching errors
    router.post('/notes', (req, res) => {
        notes
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
    });

    //delete request
    router.delete('/notes/:id', (req, res) => {
        notes
          .removeNote(req.params.id)
          .then(() => res.json({ ok: true }))
          .catch((err) => res.status(500).json(err));
      });

module.exports = router;