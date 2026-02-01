const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Lab_9_DB_URL, {
            dbName: 'backend_lab_9'
        })
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
