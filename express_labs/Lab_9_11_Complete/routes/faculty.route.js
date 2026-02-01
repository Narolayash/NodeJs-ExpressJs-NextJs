const express = require('express');
const facultyRouter = express.Router();
const Faculty = require('../models/faculty.model');

// GET all faculties
facultyRouter.get('/', async (req, res) => {
    try {
        const faculies = await Faculty.find();
        res.json(faculies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one faculty by id
facultyRouter.get('/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'faculty not found' });
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new faculty
facultyRouter.post('/', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const saveFaculty = await newFaculty.save();
        res.status(201).json(saveFaculty);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update faculty
facultyRouter.put('/:id', async (req, res) => {
    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFaculty) return res.status(404).json({ message: 'faculty not found'});
        res.json(updatedFaculty);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE faculty
facultyRouter.delete('/:id', async (req, res) => {
    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) return res.status(404).json({ message: 'faculty not found' });
        res.json({ message: 'faculty deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = facultyRouter;
