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

bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ category: 1 });
bookSchema.index({ status: 1 });

bookSchema.pre('save', async function() {
    if (this.availableCopies > this.totalCopies) {
        throw new Error('Available copies cannot exceed total copies');
    }
    if (this.availableCopies === 0) {
        this.status = 'UNAVAILABLE';
    } else {
        this.status = 'AVAILABLE';
    }
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

