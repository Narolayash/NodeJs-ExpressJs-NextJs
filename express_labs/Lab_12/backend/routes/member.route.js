const express = require('express');
const { body, validationResult } = require('express-validator');
const memberRouter = express.Router();
const { 
    getAllMembers, 
    getMemberById, 
    insertMember, 
    updateMemberInfo, 
    deleteMemberById } = require('../controllers/member.controller');

memberRouter.get('/', async (req, res) => {
    try {
        const members = await getAllMembers();
        res.status(200).json({
            success: true,
            data: members
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to fetch member'
        });
    }
});

memberRouter.get('/:id', async (req, res) => {
    try {
        const member = await getMemberById(req.params.id);
        res.status(200).json({
            success: true,
            data: member
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to fetch member'
        });
    }
});

memberRouter.post('/', [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    body('rollNo')
        .trim()
        .notEmpty()
        .withMessage('Roll number is required'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid'),
    body('phone')
        .optional()
        .trim()
        .isMobilePhone()
        .withMessage('Phone number must be valid'),
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
        const result = await insertMember(req.body);
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to insert member'
        });
    }
});

memberRouter.patch('/:id', async (req, res) => {
    try {
        const updatedMemeber = await updateMemberInfo(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: updatedMemeber
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to update member'
        });
    }
});

memberRouter.delete('/:id', async (req, res) => {
    try {
        const deletedMember = await deleteMemberById(req.params.id);
        res.status(200).json({
            success: true,
            data: deletedMember
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'failed to delete member'
        });
    }
});

module.exports = memberRouter;
