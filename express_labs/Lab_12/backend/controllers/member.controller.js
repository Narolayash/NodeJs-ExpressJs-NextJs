const mongoose = require('mongoose');
const Member = require('../models/member.model');

// GET all member 
async function getAllMembers() {
    try {
        const members = await Member.find();
        return members;
    } catch (err) {
        console.error('Error fetching members:', err.message);
        throw err;
    }
}

// GET member by id
async function getMemberById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invalid member id');
            error.statusCode = 400;
            throw error;
        }

        const member = await Member.findById(id);
        if (!member) {
            const error = new Error('memeber not found');
            error.statusCode = 404;
            throw error;
        }
        return member;
    } catch (err) {
        console.log('Error fetching member by id:', err.message);
        throw err;
    }
}

// POST member or member
async function insertMember(data) {
    try {
        if (Array.isArray(data)) {
            const members = await Member.insertMany(data);
            return members;
        } else {
            const member = await Member.create(data);
            return member;
        }
    } catch (err) {
        console.log('Error inserting member', err.message);
        throw err;
    }
} 

// PATCH member by id
async function updateMemberInfo(id, data) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invaild member id');
            error.statusCode = 400;
            throw error;
        }

        const updatedMember = await Member.findByIdAndUpdate(
            id, 
            data, 
            { new: true, runValidators: true }
        );
        if (!updatedMember) {
            const error = new Error('member not found');
            error.statusCode = 404;
            throw error;
        }
        return updatedMember;
    } catch (err) {
        console.log('Error changing member info by id:', err.message);
        throw err;
    }
}


// DELETE member by id
async function deleteMemberById(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('invaild member id');
            error.statusCode = 400;
            throw error;
        }

        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
            const error = new Error('member not found');
            error.statusCode = 404;
            throw error;
        }
        return deletedMember;
    } catch (err) {
        console.log('Error deleting member by id:', err.message);
        throw err;
    }
}


module.exports = {
    getAllMembers,
    getMemberById,
    insertMember,
    updateMemberInfo,
    deleteMemberById
}
