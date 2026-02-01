const express = require('express');
const { body, validationResult } = require('express-validator');
const bookRouter = express.Router();
const { 
    getAllBooks, 
    getBookById, 
    insertBook, 
    updateBookInfo, 
    deleteById } = require('../controllers/book.controller');

bookRouter.get('/', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to fetch books'
        });
    }
});

bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await getBookById(req.params.id);
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to fetch book'
        });
    }
});

bookRouter.post('/', [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author is required'),
    body('totalCopies')
        .isInt({ min: 0 })
        .withMessage('Total copies must be a positive number'),
    body('availableCopies')
        .isInt({ min: 0 })
        .withMessage('Available copies must be a positive number'),
    body('isbn')
        .optional()
        .trim()
        .isString()
        .withMessage('ISBN must be a string'),
], async (req, res) => {
    // Check if validation found any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send them back to the user
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    try {
        const result = await insertBook(req.body);
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to insert book'
        });
    }
});

bookRouter.patch('/:id', async (req, res) => {
    try {
        const updatedBook = await updateBookInfo(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: updatedBook
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to update book'
        });
    }
});

bookRouter.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await deleteById(req.params.id);
        res.status(200).json({
            success: true,
            data: deletedBook
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to delete book'
        });
    }
});

module.exports = bookRouter;
