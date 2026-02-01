const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LAB_12_DB_URL, {
            dbName: 'backend_lab_12_library_management_system'
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
