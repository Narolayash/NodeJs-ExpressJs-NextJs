require('../../loadEnv');

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Lab 12 backend working');
});

app.use('/book', require('./routes/book.route'));
app.use('/member', require('./routes/member.route'));
app.use('/issue', require('./routes/issue.route'));

module.exports = app;
