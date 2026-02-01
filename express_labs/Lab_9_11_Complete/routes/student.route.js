const mongoose = require('mongoose');
const express = require('express');
const studentRouter = express.Router();
const Student = require('../models/student.model');

// GET all students
studentRouter.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET student by id
studentRouter.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid student id'});
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new student
studentRouter.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const saveStudent = await newStudent.save();
        res.status(201).json(saveStudent);
    } catch (err) {
        res.status(400).json({ message: 'validation or duplication error', error: err.message });
    }
});

// PUT update student
studentRouter.put('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid studnet id' });
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) return res.status(404).json({ message: 'student not found'});
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: 'update failed', error: err.message });
    }
});

// DELETE student
studentRouter.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid student id' });
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: 'student not found' });
        res.status(200).json({ message: 'student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = studentRouter;
