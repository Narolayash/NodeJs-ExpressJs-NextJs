const mongoose = require('mongoose');
const Issue = require('../models/issue.model');
const Book = require('../models/book.model');
const Member = require('../models/member.model');

// GET all issues 
async function getAllIssues() {
    try {
        const issues = await Issue.find()
            .populate('book', 'title author isbn')
            .populate('member', 'name rollNo email')
            .sort({ createdAt: -1 });

        return issues;
    } catch (error) {
        console.error('Error fetching issues:', err.message);
        throw error;
    }
}

// GET issue by id
async function getIssueById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid issue id');
            error.statusCode = 400;
            throw error;
        }

        const issue = await Issue.findById(id)
            .populate('book', 'title author isbn')
            .populate('member', 'name rollNo email');

        if (!issue) {
            const error = new Error('issue not found');
            error.statusCode = 404;
            throw error;
        }
        return issue;
    } catch (error) {
        console.log('Error fetching issue by id:', err.message);
        throw error;
    }
}

// POST issue
async function insertIssue(data) {
    try {
        const { bookId, memberId, dueDate } = data;

        if (
            !mongoose.Types.ObjectId.isValid(bookId) ||
            !mongoose.Types.ObjectId.isValid(memberId)
        ) {
            const error = new Error('invalid bookid or memberid');
            error.statusCode = 400;
            throw error;
        }

        const book = await Book.findById(bookId);
        if (!book) {
            const error = new Error('book not found');
            error.statusCode = 404;
            throw error;
        }

        const member = await Member.findById(memberId);
        if (!member) {
            const error = new Error('member not found');
            error.statusCode = 404;
            throw error;
        }

        if (await Issue.findOne({
            book: bookId,
            status: "ISSUED"
        })) {
            const error = new Error('book is already issued');
            error.statusCode = 409;
            throw error;
        }

        if (book.availableCopies <= 0) {
            const error = new Error('book not available');
            error.statusCode = 409;
            throw error;
        }

        const issue = await Issue.create({
            book: bookId,
            member: memberId,
            dueDate
        });

        book.availableCopies -= 1;
        await book.save();

        return issue;
    } catch (err) {
        console.log('Error creation issue', err.message);
        throw err;
    }
} 

// PATCH return book
async function returnBook(issueId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            const error = new Error('invalid issue id');
            error.statusCode = 400;
            throw error;
        }

        const issue = await Issue.findById(issueId);
        if (!issue) {
            const error = new Error('issue not found');
            error.statusCode = 404;
            throw error;
        }

        if (issue.status === 'RETURNED') {
            const error = new Error('book already returned');
            error.statusCode = 409;
            throw error;
        }

        issue.status = "RETURNED";
        issue.returnDate = new Date();
        await issue.save();

        const book = await Book.findById(issue.book);
        if (book) {
            book.availableCopies += 1;
            await book.save();
        }

        return issue;
    } catch (err) {
        console.log('Error returning book:', err.message);
        throw err;
    }
}


// DELETE book by id
async function deleteIssueById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid issue id');
            error.statusCode = 400;
            throw error;
        }

        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) {
            const error = new Error('issue not found');
            error.statusCode = 404;
            throw error;
        }

        return deletedIssue;
    } catch (err) {
        console.log('Error deleting issue:', err.message);
        throw err;
    }
}


module.exports = {
    getAllIssues,
    getIssueById,
    insertIssue,
    returnBook,
    deleteIssueById
}
