const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const DB_URI = 'mongodb://localhost:27017/db_DB';
mongoose.connect(DB_URI)
    .then(() => console.log("Data base connected!"))
    .catch(err => console.error('error', err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isEmailVerified: Boolean,
    role: String,
});
const User = mongoose.model('User', UserSchema);


app.post("/login", async (req, res) => {
    const data = await User.find({email: req.body.email, password: req.body.password});
    if(data.length > 0) {
        const token = await jwt.sign({ id: data._id, email: data.email}, "musecretkey");
        res.send("valid");
    }
    else {
        res.send("Invalid");
    }
});


app.get('/user', async (req, res) => {
    try {
        // if(user == "arjun" && password == "bala") {
            const users = await User.find();
            if (users.length === 0) return res.status(404).json({ message: 'not even one faculty in database'});
            res.json(users);
        // }
        // else {
            res.send("unthorized"); 
        // }

    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

// app.get('/user/emailverified', async (req, res) => {
//     try {
//         const users = await User.find({isEmailVerified: true});
//         if (users.length === 0) return res.status(404).json({ message: 'not even one faculty in database'});
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error : err.message });
//     }
// });

app.get('/user/emailverified/:status', async (req, res) => {
    try {
        const users = await User.find({isEmailVerified: req.params.status});
        if (users.length === 0) return res.status(404).json({ message: 'not even one faculty in database'});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'faculty not found'});
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
});

app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const ans = await User.findByIdAndUpdate(req.params.id, req.body,  {
            new: true,           // updated data return
            runValidators: true  // schema validation
        });
        res.send(ans);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
});

// app listen
app.listen(3000, () => {
    console.log("web server working @3000");
});
