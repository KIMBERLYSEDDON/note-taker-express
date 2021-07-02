const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { networkInterfaces } = require('os');
const noteList = []


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteList));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.post('/api/notes', (req, res) => {
   const newNote = req.body;
   newNote.id = uuidv4();
   console.log(newNote)
    if (newNote){
      // class Note {
      //   constructor(title, text, id){
      //     newNote.title = title,
      //     newNote.text = text,
      //     newNote.id = id
      //   }
      // };
      // noteList.add(new Note (newNote))
      noteList.push(newNote);
      const notes = JSON.stringify(noteList)
      // const notes2 =JSON.parse(newNote)
      console.log(noteList)
      // console.log(notes2)

      res.json(noteList); 
    }
});
fs.appendFile('./db/db.json', `${noteList}`, (err) =>
    err ? console.error(err) : console.log('Commit logged!')
);
// app.delete('api/notes/:id', (req, res) => {

// })
app.delete('/api/notes/:id', (req, res) => {
  res.send("DELETE Request Called")
})

app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});
