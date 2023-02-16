const util = require('util');
const fs = require('fs');
const uuid = require('uuid');

class Notes {
    //function to read through note file
    read() {
        fs.readFileSync('db/db.json', 'utf8')
    }
    //function to write to a file
    write(note) {
        fs.writeFileSync('db/db.json', JSON.stringify(note))
    }
    //function to grab notes for page
    getNote() {
        return this.read().then((notes) => {
            let notesArray;
            try {
                notesArray = [].concat(JSON.parse(notes))
            } catch(err){
                notesArray = [];
            }
            return notesArray;
        })
    }
    //function to make a new note
    createNote(note) {
        const { title, body } = note;
        if (!title || !body) {
            throw Error('note cannot be blank')
        }
        const newNote = {title, body, id: uuid()}
        //updating to add new note to array
        return this.getNote()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.write(updateNotes))
            .then(() => newNote)
    }
    //delete note
    deleteNote(id) {
        return this.getNote()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNote) => this.write(filteredNote))
    }
}

module.exports = new Notes();