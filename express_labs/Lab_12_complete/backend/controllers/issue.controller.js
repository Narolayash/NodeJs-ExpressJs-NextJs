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
        console.error('Error fetching issues:', error.message);
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
        console.log('Error fetching issue by id:', error.message);
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

        if (member.status !== 'ACTIVE') {
            const error = new Error('cannot issue book to inactive member');
            error.statusCode = 403;
            throw error;
        }

        if (await Issue.findOne({
            book: bookId,
            member: memberId,
            status: "ISSUED"
        })) {
            const error = new Error('This member has already borrowed this book');
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
    } catch (error) {
        console.log('Error creation issue', error.message);
        throw error;
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
            // Ensure we don't exceed total copies (auto-correction for inconsistent data)
            if (book.availableCopies < book.totalCopies) {
                book.availableCopies += 1;
                await book.save();
            } else {
                 // Even if we don't increment, we save to update status if needed, 
                 // but since we aren't changing anything critical, we can skip save or just save the issue.
                 console.log('Warning: Book returned but available copies already at max. Data inconsistency detected.');
            }
        }

        return issue;
    } catch (error) {
        console.log('Error returning book:', error.message);
        throw error;
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

        if (deletedIssue.status === 'ISSUED') {
            const book = await Book.findById(deletedIssue.book);
            if (book) {
                book.availableCopies += 1;
                await book.save();
            }
        }

        return deletedIssue;
    } catch (error) {
        console.log('Error deleting issue:', error.message);
        throw error;
    }
}


module.exports = {
    getAllIssues,
    getIssueById,
    insertIssue,
    returnBook,
    deleteIssueById
}
