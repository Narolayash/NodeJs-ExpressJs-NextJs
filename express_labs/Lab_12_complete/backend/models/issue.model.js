const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returnDate: { type: Date },
    status: {
        type: String,
        enum: ["ISSUED", "RETURNED"],
        default: "ISSUED"
    }
}, { 
    timestamps: true 
});

issueSchema.index({ book: 1, status: 1 });
issueSchema.index({ member: 1, status: 1 });

module.exports = mongoose.model("Issue", issueSchema);
