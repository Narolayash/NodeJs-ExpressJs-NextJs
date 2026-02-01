const express = require('express');
const { body, validationResult } = require('express-validator');
const issueRouter = express.Router();
const {
    getAllIssues,
    getIssueById,
    insertIssue,
    returnBook,
    deleteIssueById } = require('../controllers/issue.controller');


issueRouter.get('/', async (req, res) => {
    try {
        const issues = await getAllIssues();
        res.status(200).json({
            success: true,
            data: issues
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error'
        });
    }
});

issueRouter.get('/:id', async (req, res) => {
    try {
        const issue = await getIssueById(req.params.id);
        res.status(200).json({
            success: true,
            data: issue
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error'
        });
    }
});

issueRouter.post('/', [
    body('bookId')
        .trim()
        .notEmpty()
        .withMessage('Book ID is required')
        .isMongoId()
        .withMessage('Book ID must be a valid MongoDB ID'),
    body('memberId')
        .trim()
        .notEmpty()
        .withMessage('Member ID is required')
        .isMongoId()
        .withMessage('Member ID must be a valid MongoDB ID'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date'),
], async (req, res) => {
    // Check if validation found any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    try {
        const issue = await insertIssue(req.body);
        res.status(201).json({
            success: true,
            data: issue
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    }
});

issueRouter.patch('/:id/return', async (req, res) => {
    try {
        const issues = await returnBook(req.params.id);
        res.status(200).json({
            success: true,
            data: issues
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error'
        });
    }
});

issueRouter.delete('/:id', async (req, res) => {
    try {
        const issue = await deleteIssueById(req.params.id);
        res.status(200).json({
            success: true,
            data: issue
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error'
        });
    }
});

module.exports = issueRouter;
