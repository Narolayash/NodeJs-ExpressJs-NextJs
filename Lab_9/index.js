// 1. Install Mongoose library using NPM. (A)
// npm intall mongoose  
const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());

// 2. Demonstrate the use mongoose functions. (A)
    // 1)  mongoose.connect() -> Connects Node app to MongoDB
    // 2) new mongoose.Schema() -> Defines structure of documents
    // 3) mongoose.model() -> Creates a Model
const db_url = "mongodb://localhost:27017/lab_9_db";
mongoose.connect(db_url)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.error("Connection error : ", err));


//----- faculty schema -----
const FacultySchema = new mongoose.Schema({
    name: String,
    department: String,
    hireDate: { type: Date, default: Date.now}
});
const Faculty = mongoose.model('faculties', FacultySchema);

//----- student schema -----
const StudentSchema = new mongoose.Schema({
    name: String,
    age: { type: Number, validate:Number.isInteger },
    spi: Number
});
const Student = mongoose.model('Student', StudentSchema);

// ----- product schema -----
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    mDate: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', ProductSchema);


// ----------------------  Faculty -----------------------------
app.post('/api/faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const savedFaculty = await newFaculty.save();
        res.status(201).json(savedFaculty);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/faculty', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        if (faculties.length === 0) return res.status(404).json({ message: "Faculty mate jagya khali chhe" });
        res.json(faculties);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/faculty/:id', async (req, res) => {
    try {
        console.log(req);
        const faculty = await Faculty.findById(req.params.id);
        if(!faculty) return res.status(404).send("Faculty Not Found!");
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// ----------------------  Student -----------------------------
app.post('/api/student', async (req, res) => {
    try {
        const savedStudent = await Student.create(req.body);
        res.status(201).json({ message: "Student added successfully", data: savedStudent });
    } catch (err) {
        res.status(400).json({ error: "Validation failed", details: err.message });
    }
});

app.get('/api/student', async (req, res) => {
    try {
        const students = await Student.find();
        if(students.length === 0) return res.status(404).json({message: "student nu vacation chhe"});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: 'server error', details: err.message });
    }
});

app.get('/api/student/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).send("Student not found!");
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});


// ----------------------  Product -----------------------------
app.post('/api/product', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find();
        if(products.length === 0) return res.status(404).json({ message: "product nathi"})
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'server error' });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const ptoduct = await Product.findById(req.params.id);
        if(!ptoduct) return res.status(404).send("Product not found!");
        res.json(ptoduct);
    } catch (err) {
        res.status(500).json({ error: 'Server error'});
    }
});

app.listen(3000 ,() => {
    console.log("Sever Chalu chhe bhai!!!");
});