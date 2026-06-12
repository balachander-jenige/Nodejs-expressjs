// ===== MODULES (CommonJS) =====
// In Node.js, every file is treated as a separate MODULE by default.
// This means variables/functions inside a file are PRIVATE unless explicitly exported.
// This is called "encapsulation" — you only share what you need.

// Interview Q: What is the CommonJS module system?
// A: Node's default module system where you use require() to import and
//    module.exports to export. Each file is its own module with private scope.
//    ES Modules (ESM) use import/export syntax and require "type":"module" in package.json.

// require() loads a module. Node caches it after first load (won't re-execute the file).
const names = require("./4-names.js")  // imports { john, peter } object
const sayHi = require("./5-utils.js")  // imports the sayHi function directly

console.log(names)    // { john: 'john/', peter: 'peter' }
console.log(sayHi)    // [Function: sayHi]

sayHi(names.john)     // calls sayHi("john/") → "Hello world john/"

// When a module has no exports (like 7-mindgrenade.js), requiring it just runs its code.
require("./7-mindgrenade.js")
