const express = require('express');
const { 
    getAllIssues, 
    getIssueById, 
    insertIssue, 
    returnBook, 
    deleteIssueById } = require('../controllers/issue.controller');
const issueRouter = express.Router();

issueRouter.get('/', async (req, res) => {
    try {
        const issues = await getAllIssues();
        res.status(200).json({
            success: true,
            data: issues
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            error: err.message || 'Internal Server Error'
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
            error: err.message || 'Internal Server Error'
        });
    }
});

issueRouter.post('/', async (req, res) => {
    try {
        const issue = await insertIssue(req.body);
        res.status(201).json({
            success: true,
            data: issue
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            error: err.message || 'Internal Server Error'
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
            error: err.message || 'Internal Server Error'
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
            error: err.message || 'Internal Server Error'
        });
    }
});

module.exports = issueRouter;
