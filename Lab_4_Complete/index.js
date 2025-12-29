const path = require("path");
const os = require("os");

// 1) Write a Node.js program that prints the directory name, file name, file extension, and full 
// path of the code file. (A) 
console.log("Directory Name: ", __dirname); // D:\Yash\Darshan University\Semester_4\Bk\Lab\Lab_4_Complete
console.log("File Name: ", __filename); // D:\Yash\Darshan University\Semester_4\Bk\Lab\Lab_4_Complete\index.js
console.log("File Extension: ", path.extname(__filename)); // .js
console.log("Base of File Name: ", path.basename(__filename)); // index.js
console.log("Base of Directory Name: ", path.basename(__dirname)); // Lab_4_Complete

// 2) Create a program that joins "users", "arjun", "documents", "project" into a single path using 
// path.join(). (A) 
console.log("using join:", path.join("users", "arjun", "document", "project")); // users\arjun\document\project

// 3) Write a program to fix the path="//folder//subfolder////file.txt" using path.normalize() and 
// display the clean normalised path. (A) 
const wrongPath = "//folder//subfolder////file.txt";
const rightPath = path.normalize(wrongPath);
console.log("Wrong Path: ", wrongPath); // //folder//subfolder////file.txt
console.log("Right Path: ", rightPath); // \\folder\subfolder\file.txt

// 4) Write a program that checks whether the given path is absolute or relative paths. (A) 
const absolutePath = __filename;
const relativePath = "Lab_4\index.js"; 

function checkAbsolutePath(filePath) {
    if(path.isAbsolute(filePath)) console.log("Absolute Path");
    else console.log("Relative Path");
}
checkAbsolutePath(absolutePath); // Absolute Path
checkAbsolutePath(relativePath); // Relative Path

// 5) Write a Node.js program that uses path.resolve() to convert "folder", "subfolder", "app.js" 
// into an absolute path. Print the final resolved path. (A)
console.log(path.resolve("folder", "subfolder", "app.js")); // D:\Yash\Darshan University\Semester_4\Bk\Lab\Lab_4_Complete\folder\subfolder\app.js

console.log("-------------------- 6 ---------------------");

// 6) Write a program that prints: (A) 
// • Operating system name 
// • Release version 
// • Platform 
// • Architecture 
console.log(os);
console.log(os.type()); // Windows_NT
console.log(os.release()); // 10.0.26200
console.log(os.platform()); // win32
console.log(os.arch()); // x64

// 7) Write a program that prints the total memory and free memory in GB (B)
console.log("---------------------- 7 ---------------------");

console.log(os.freemem()); // 8627343360 (bytes)
console.log(os.totalmem()); // 16989736960

function bytesINTOgb(memory) {
    return (memory / (1024 * 1024 * 1024)).toFixed(2);
}

console.log("Total in GB = ", bytesINTOgb(os.totalmem())); // Total in GB =  15.82
console.log("Free memory in GB = ", bytesINTOgb(os.freemem())); // Free memory in GB =  8.03

// 8) Write a Node.js program that prints details about the currently logged-in user in operating system. (B)
console.log("----------------------- 8 ---------------------");
console.log(os.userInfo()); 
    // [Object: null prototype] {
    // uid: -1,
    // gid: -1,
    // username: 'Yash Narola',
    // homedir: 'C:\\Users\\Yash Narola',
    // shell: null
    // }
console.log((os.userInfo()).username); // Yash Narola

// 9) Write a program that prints how long the system has been running (uptime) in seconds and in hours. (B)
console.log("------------------------ 9 ---------------------");
console.log(os.uptime()); /// 20609.562
console.log(((os.uptime()) / 3600).toFixed(2)); // 5.72

// 10) Write a Node.js program that prints: (B)
console.log("----------------------- 10 ---------------------");
console.log(os.cpus());
    // [
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 245171, nice: 0, sys: 793250, idle: 15105796, irq: 226812 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 214437, nice: 0, sys: 233406, idle: 15696312, irq: 27421 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 515796, nice: 0, sys: 368375, idle: 15259984, irq: 29656 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 350468, nice: 0, sys: 292375, idle: 15501296, irq: 16796 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 183125, nice: 0, sys: 199031, idle: 15761984, irq: 15171 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 204437, nice: 0, sys: 188203, idle: 15751500, irq: 16687 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 419796, nice: 0, sys: 304312, idle: 15420046, irq: 20500 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 321000, nice: 0, sys: 337109, idle: 15486031, irq: 19359 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 147734, nice: 0, sys: 135546, idle: 15860859, irq: 12140 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 171296, nice: 0, sys: 155625, idle: 15817218, irq: 15781 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 193203, nice: 0, sys: 169187, idle: 15781750, irq: 12375 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 116609, nice: 0, sys: 117156, idle: 15910375, irq: 9234 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 138843, nice: 0, sys: 130375, idle: 15874921, irq: 10390 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 182484, nice: 0, sys: 132968, idle: 15828687, irq: 10968 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 596234, nice: 0, sys: 730593, idle: 14817312, irq: 33703 }
        // },
        // {
        //     model: 'AMD Ryzen 7 7435HS                             ',
        //     speed: 3094,
        //     times: { user: 536734, nice: 0, sys: 623765, idle: 14983656, irq: 25750 }
        // }
    // ]

//  Number of CPU cores
console.log((os.cpus()).length); // 16

// • Model name of each core
(os.cpus()).forEach((core, index) => {
    console.log(`${index + 1}`, core.model);
})

// • Network interface details
console.log("Network interface details : ")
console.log(os.networkInterfaces());