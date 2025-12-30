const fs = require('fs');
const { eventNames } = require('process');

// 1) Write a Node.js program that uses fs.readFile() to read a file named data.txt asynchronously 
// and print its content on the console. (A) 

// // ----- if file not exist -----
// fs.readFile("data.txt", (error, data)=>{
//     if(error) console.error(error);
//     else console.log(data)
// });
// // [Error: ENOENT: no such file or directory, open 'D:\Yash\Darshan University\Semester_4\Bk\Lab\Lab_6\data.txt'] {
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'open',
// //   path: 'D:\\Yash\\Darshan University\\Semester_4\\Bk\\Lab\\Lab_6\\data.txt'
// // }

// ----- file exist but not in utf-8 format ----- 
// fs.readFile("data.txt", (error, data)=>{
//     if(error) console.error(error);
//     else console.log(data);
// });
{/* <Buffer 48 65 6c 6c 6f 21 20 49 20 61 6d 20 64 61 74 61 2e 74 78 74 20 66 69 6c 65 2e>  */}


// // ----- in utf8 format ----- 
// fs.readFile("data.txt", "utf8", (error, data)=>{
//     if(error) console.error(error);
//     else console.log(data);
// });

// ----- also use toString ----- 
// fs.readFile("data.txt", "utf8", (error, data)=>{
//     if(error) console.error(error);
//     else console.log(data.toString());
// });

// 2) Use fs.readFileSync() to read info.txt and print the content, Compare execution with the 
// asynchronous version. (A) 

// -- working -- 
// try {
//     const data = fs.readFileSync("info.txt", "utf-8");
//     console.log(data);
// }
// catch (error){
//     console.error("some error occur.");
// }


// -- error occurs --
// try {
//     const data = fs.readFileSync("wrongFileName.txt", "utf-8");
//     console.log(data);
// }
// catch (error){
//     console.error("some error occur.");
// }



// 3) Create a program that writes the text into a file named output.txt. (A) 
// fs.writeFile("output.txt", "Hello! I am output.txt file.. hhe hhe", (error) => {
//     if(error) console.error(error);
//     else console.log("work done.");
// });



// 4) Create a program that appends the text into a file named output.txt. (A) 
// fs.appendFile("output.txt", "This is appdened text.", (error) => {
//     if(error) console.error(error);
//     else console.log("appdend successfully");
// });



// 5) Write a program to delete a file named temp.txt using fs.unlink() and display success or 
// error. (B) 
// fs.unlink("temp.txt", (error) => {
//     if(error) console.error(error);
//     else console.log("File deleted!");
// });


// 6) Write a program that creates a folder named my-data using fs.mkdir(). If the folder already 
// exists, show an appropriate message. (B)

// fs.mkdir("./my-data", (err, data) => {
//     if(err.code === 'EEXIST') console.error("directory already exists");
//     else console.log(data);
// });



// 7) Write a program to list all files in a folder called documents/ using fs.readdir() and print the 
// file names one by one. (B) 

// -- 1 -- 
// fs.readdir('.', (err, data) => {
//     if(err) console.log(err);
//     else console.log(data);
// });

// -- 2 --
// fs.readdir('.', (err, data) => {
//     if(err) console.log(err);
//     else console.log(data);
// });

// -- 3 --
// fs.readdir('.', (err, data) => {
//     if(err) console.log(err);
//     else console.log(data);
// });



// 8) Write a program that copies a file named source.txt to a new file named backup.txt using 
// fs.copyFile(). (C) 

// fs.copyFile('source.txt', 'backup.txt', (err) => {
//     console.error(err);
// });



// 9) Write a program that checks if the file config.json exists in the current directory using 
// fs.existsSync() and prints the result. (B) 

// if (fs.existsSync("config.json")) console.log("File exist!");
// else console.log("File not exist!");



// 10) Write a program using fs.watch() to monitor changes in watchme.txt. Whenever file content 
// changes, print: “File Changed” (C) 

fs.watch('output.txt', (eventType, fileName) => {
    console.log(eventType);
    console.log(fileName);
});
