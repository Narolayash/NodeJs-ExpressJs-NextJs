const url = require('url');
const child_process = require('child_process');

// 1) Write a Node.js program using child_process.exec() to run the shell command to check the 
// current version of node. (A) 
// exec() --> Short-running, simple shell commands where you need the entire output in a callback function upon completion.
// console.log(child_process);

// child_process.exec('node -v', (error, stdout, stderr) => {
//     if(error) {
//         console.log("node error")
//         console.error('Error:', error.message);
//         return;
//     }

//     if(stderr) {
//         console.error('Stderr:', stderr);
//         return;
//     }

//     console.log(stdout);
// });



// 2) Write a program that uses child_process.spawn() to run the command to print files and
// folders of current directory. (B)

// const ls = child_process.spawn('cmd', ['/c', 'dir']);
// ls.stdout.on('data', (data) => {
//     console.log(data.toString());
// });
// ls.stderr.on('data', (data) => {
//     console.log(data.toString());
// });
// ls.on('close', (code)=> {
//     console.log(code);
// });



// 3) Write a program to print current working directory using nodes. (B)
// console.log(process); // process → global Node object

// console.log("Current working directory :", process.cwd());



// 4) Write a program that parses the given URL, Print protocol, hostname, pathname, and query
// parameters separately. (A)
// // console.log(url);

// -- 1 -- 
// const myUrl = "https://www.example.com:8080/search?query=test&category=web"
// console.log(url.parse(myUrl)); // query string na form ma return krse
// console.log(url.parse(myUrl, true)); // query ni object na form ma return krse
 
// -- 2 --
// const myUrl = "https://www.example.com:8080/search?query=test&category=web"
// const parsed = url.parse(myUrl, true);
// console.log(parsed);
// console.log(parsed.protocol);
// console.log(parsed.host);
// console.log(parsed.hostname);
// console.log(parsed.path);
// console.log(parsed.pathname);
// console.log(parsed.query);
// console.log(parsed.query.query);
// console.log(parsed.query.category);



// 5) Create a new URL object with base, then append pathname and query, also print the final
// URL. (B)
// search → the query string as plain text
// searchParams → an object to read/write query parameters easily

// const myUrlObj = new URL('https://example.com');
// myUrlObj.pathname = 'p/a/t/h';

// myUrlObj.search = '?catagory=wab';
// myUrlObj.searchParams.append('username', 'yash');

// console.log(myUrlObj);
// console.log(myUrlObj.toString());



// 6) Create an EventEmitter instance, Register an event "greet" and print a message when
// triggered. Fire that event manually using .emit().(B)
const EventEmitter = require('events');

// console.log(EventEmitter);
const emitter = new EventEmitter();
// console.log(emitter);

// -- 1 --
// // listener
// emitter.on("greet",  () => {
//     console.log("Hello! good morning");
// });

// // emitter
// emitter.emit("greet");
// emitter.emit("greet");
// emitter.emit("greet");

// -- 2 -- 
setInterval(() => {
    emitter.emit("tick");
}, 2000);

emitter.on("tick", () => {
    console.log("Tick tock");
});




// ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                              href                                              │
// ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │          host          │           path            │ hash  │
// │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │    hostname     │ port │ pathname │     search     │       │
// │          │  │                     │                 │      │          ├─┬──────────────┤       │
// │          │  │                     │                 │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘
// (All spaces in the "" line should be ignored. They are purely for formatting.)