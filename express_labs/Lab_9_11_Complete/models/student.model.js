const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    rollno: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true},
    phone: { type: String, required: true, trim: true},
    gender: { type: String, enum: ["Male", "Female", "Other"]},
    dateOfBirth: { type: Date, required: true },
    course: { type: String, required: true, trim: true },
    semester: { type: Number, required: true, min: 1, max: 12 },
    department: { type: String, required: true, trim: true },
    enrollmentYear: { type: Number, required: true },
    address: { type: String, required: true, trim: true },
    feePaid: { type: Boolean, default: false }
}, {
    timestamps: true
});

// req.body --demo
// {
//     "rollno": "101",
//     "fullName": "Narola Yash N.",
//     "email": "yashnarola2525@gmail.com",
//     "phone": "7567422700",
//     "gender": "Male",
//     "dateOfBirth": "2007-03-10",
//     "course": "B Tech",
//     "semester": 4,
//     "department": "CSE",
//     "enrollmentYear": 2024,
//     "address": "NASA International Space Station",
//     "feePaid": true
// }

module.exports = mongoose.model('Student', studentSchema);
