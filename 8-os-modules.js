// ===== OS MODULE (Built-in) =====
// The 'os' module provides info about the operating system.
// No install needed — it's built into Node.js.

// Interview Q: Name some methods of the os module.
// A: os.userInfo() → current user details (username, homedir, shell)
//    os.uptime()   → system uptime in SECONDS
//    os.type()     → OS name: 'Linux', 'Darwin' (Mac), 'Windows_NT'
//    os.release()  → OS version string
//    os.totalmem() → total RAM in bytes
//    os.freemem()  → available RAM in bytes
//    os.homedir()  → home directory path (it's a function, call it with ())

const os = require('os')

// BUG NOTE: os.homedir is a function — should be os.homedir() with parentheses
// Without () it just logs the function reference, not the actual path
console.log(os.homedir)   // logs [Function: homedir] — bug: should be os.homedir()

// Returns object: { uid, gid, username, homedir, shell }
const user = os.userInfo()
console.log(user)

// uptime in seconds (how long OS has been running)
console.log(os.uptime())

// Build a custom object with key OS stats
const currentOS = {
  name      : os.type(),       // e.g. 'Linux'
  release   : os.release(),    // e.g. '5.15.0'
  totalmem  : os.totalmem(),   // total RAM in bytes
  freemem   : os.freemem()     // free RAM in bytes
}

console.log(currentOS)
