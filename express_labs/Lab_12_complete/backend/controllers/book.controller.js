const mongoose = require('mongoose');
const Book = require('../models/book.model');

// GET all books 
async function getAllBooks() {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return books;
    } catch (err) {
        console.error('Error fetching books:', err.message);
        throw err;
    }
}

// GET book by id
async function getBookById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid book id');
            error.statusCode = 400;
            throw error;
        }

        const book = await Book.findById(id);
        if (!book) {
            const error = new Error('book not found');
            error.statusCode = 404;
            throw error;
        }
        return book;
    } catch (err) {
        console.log('Error fetching book by id:', err.message);
        throw err;
    }
}

// POST book or books
async function insertBook(data) {
    try {
        if (Array.isArray(data)) {
            const books = await Book.insertMany(data);
            return books;
        } else {
            const book = await Book.create(data);
            return book;
        }
    } catch (err) {
        console.log('Error inserting book', err.message);
        throw err;
    }
} 

// PATCH book by id
async function updateBookInfo(id, data) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid book id');
            error.statusCode = 400;
            throw error;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id, 
            data, 
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            const error = new Error('book not found');
            error.statusCode = 404;
            throw error;
        }
        return updatedBook;
    } catch (err) {
        console.log('Error changing book info by id:', err.message);
        throw err;
    }
}


// DELETE book by id
async function deleteById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid book id');
            error.statusCode = 400;
            throw error;
        }

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            const error = new Error('book not found');
            error.statusCode = 404;
            throw error;
        }
        return deletedBook;
    } catch (err) {
        console.log('Error deleting book by id:', err.message);
        throw err;
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    insertBook,
    updateBookInfo,
    deleteById
}
