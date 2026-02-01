const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    isbn: { type: String, unique: true, sparse: true },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ["AVAILABLE", "UNAVAILABLE"],
        default: "AVAILABLE"
    }
},  { 
    timestamps: true 
});

module.exports = mongoose.model("Book", bookSchema);

// req.body --demo
// {
//   "title": "Introduction to Algorithms",
//   "author": "Thomas H. Cormen",
//   "category": "Computer Science",
//   "isbn": "9780262033848",
//   "totalCopies": 3,
//   "availableCopies": 3
// }

