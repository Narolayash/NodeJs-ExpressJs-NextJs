require('../loadEnv');
const express = require('express');
const path = require('path');

const app = express();

// 1. Demonstrate the use of middleware in Express. (A)

// const demoMiddleWare = (req, res, next) => {
//     console.log("Middleware kam kare chhe!");
//     console.log(req.path);
//     next();
// };

// app.get('/', demoMiddleWare, (req, res) => {
//     res.send("AhhhhW!");
// });

// app.get('/about', demoMiddleWare, (req, res) => {
//     res.send("this is about page!");
// });


// 2. Demonstrate the use of static middleware in Express. (A) 
// Static middleware is a middleware that serves static files to the browser.

// http://localhost:3000/Hello.txt

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Lab 10 backend working");
});

const PORT = process.env.LAB_10_PORT
app.listen(PORT, () => {
    console.log("Sever onnnn!! @", PORT);   
});





// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//     res.send("Home page!"); 
// }); 


// const authAdmin = (req, res, next) => {
//     if(req.query.admin == "iAmAdmin") {
//         console.log("Access chhe");
//         next();
//     }
//     else console.log("Access denied");
// };

// app.get('/admin', authAdmin, (req, res) => {
//     res.send("Welcome kaka!");
// });
