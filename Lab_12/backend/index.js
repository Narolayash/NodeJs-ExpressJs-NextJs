
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(express.json());

const DATA_URI = 'mongodb://localhost:27017/Lab_11_db';
mongoose.connect(DATA_URI)
    .then(() => console.log('database connected!'))
    .catch((err => console.error('error:', err)));

// Book Schema
const LibBookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publicationDate: { type: Date, default: Date.now },
    type: String,
});
// Library Book model
const LibBook = mongoose.model('LibBook', LibBookSchema);

app.get('/books', async (req, res) => {
    try {
        const books = await LibBook.find();
        if (books.length === 0) return res.status(404).json({ message: 'Not any book available'});
        res.json(books);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

app.post('/books', async (req, res) => {
    try {
        const newBook = new LibBook(req.body);
        const saveBook = await newBook.save();
        res.status(201).json(saveBook);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
});

app.listen(3000, ()=> {
    console.log('Web server started! @3000');
});
