const app = require('./index');

const PORT = process.env.LAB_12_PORT;
app.listen(PORT, ()=> {
    console.log('Web server started! at', PORT);
});
