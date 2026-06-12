// ===== MODULE EXECUTION ON REQUIRE =====
// When you require() a file, Node EXECUTES it immediately.
// This file has no exports — it's required just to run its side-effect code.

// Interview Q: Are Node modules cached after first require()?
// A: YES. Node caches the module after the first require().
//    Subsequent require() calls for the same file return the cached export
//    without re-executing the file. This improves performance.

// Interview Q: What are Node's built-in modules?
// A: os, path, fs, http, events, stream, crypto, url, querystring, etc.
//    These are included with Node — no npm install needed.
//    Import them with require('moduleName') — no ./ prefix needed.

const num = 10
const num2 = 20

function addValues(num, num2) {
  console.log(num + num2)   // 30
}
addValues(num, num2)

// Built-in Modules overview (for interview reference):
// os   - operating system info (cpu, memory, uptime, home dir)
// path - file path utilities (join, resolve, basename, extname)
// fs   - file system (read/write/delete files and directories)
// http - create HTTP servers and make HTTP requests
