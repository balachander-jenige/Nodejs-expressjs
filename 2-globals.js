// ===== NODE.js GLOBALS =====
// Unlike browser JS, Node has NO 'window' object.
// Instead it has its own global variables available everywhere without importing.

// __dirname  - absolute path to the DIRECTORY of the current file
// __filename - absolute path to the current FILE itself
// require    - function to import modules (CommonJS module system)
// module     - object that represents the current module/file
// process    - object with info about the current Node.js process
//              e.g. process.env (env variables), process.argv (CLI args), process.exit()

// Interview Q: What is the difference between __dirname and __filename?
// A: __dirname → folder path  e.g. /home/user/project
//    __filename → full file path e.g. /home/user/project/2-globals.js

// Interview Q: What is the 'process' object?
// A: A global object that provides info & control over the current Node.js process.
//    Key properties: process.env, process.argv, process.pid, process.exit()

console.log(__dirname)   // prints current directory path

// setInterval: runs the callback every 1000ms (1 second)
// This is a Node global (works in browser too), no import needed
setInterval(()=>{
  console.log("Hello World")
},1000)
