const express = require('express');
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

bookRouter.post('/', async (req, res) => {
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
