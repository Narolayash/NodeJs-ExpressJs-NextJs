const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    facultyId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: String,
    department: String,
    designation: String,
    qualification: String,
    experienceYear: Number,
    salary: Number,
    isActive: { type: Boolean, default: true },
    joiningDate: { type: Date, default: Date.now },
}, {
    timestamps: true
});

// req.body --demo
// {
//     "facultyId": "Prof-1",
//     "fullName": "Prof. Arjun Bala",
//     "email": "arjunbala@uni.edu",
//     "phone": "7546821235",
//     "department": "Civil",
//     "designation": "Professor",
//     "qualification": "M. Tech",
//     "experienceYear": 12,
//     "salary": 1200000
// }

module.exports = mongoose.model('Faculty', facultySchema);
