require('../loadEnv');

const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Lab 9 backend working');
});

app.use('/faculty', require('./routes/faculty.route'));
app.use('/student', require('./routes/student.route'));
app.use('/product', require('./routes/product.route'));

const PORT = process.env.LAB_9_PORT;
app.listen(PORT, () => {
    console.log("Lab 9 app started at", PORT);
});
