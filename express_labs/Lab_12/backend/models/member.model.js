const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: { type: String },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    joinedDate: { type: Date, default: Date.now }
},{ 
    timestamps: true 
});

module.exports = mongoose.model("Member", memberSchema);

// req.body --demo
// {
//     "name": "Rahul Sharma",
//     "rollNo": "CS101",
//     "email": "rahul.sharma@gmail.com",
//     "phone": "9876543210"
// }

