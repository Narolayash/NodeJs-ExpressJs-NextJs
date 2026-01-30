const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const DATABASE_URL = 'mongodb://localhost:27017/lab_9_db';
mongoose.connect(DATABASE_URL)
    .then(() => console.log('database connected!'))
    .catch((err => console.error('error:', err)));

const FacultySchema = new mongoose.Schema({
    name: String,
    department: String,
    hireDate: { type: Date, default: Date.now },
});
const Faculty = mongoose.model('Faculty', FacultySchema);

app.get('/faculty', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        if (faculties.length === 0) return res.status(404).json({ message: 'not even one faculty in database'});
        res.json(faculties);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

app.get('/faculty/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'faculty not found'});
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

app.post('/faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const saveFaculty = await newFaculty.save();
        res.status(201).json(saveFaculty);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
});

app.put('/faculty/:id', async (req, res) => {
    try {
        const faculty = Faculty.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!faculty) res.status(404).error
    }
});




// app listen
app.listen(3000, () => {
    console.log("web server working @3000");
});
