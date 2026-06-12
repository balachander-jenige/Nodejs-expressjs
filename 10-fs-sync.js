// ===== FS MODULE — SYNCHRONOUS (Built-in) =====
// The 'fs' module lets you interact with the file system: read, write, delete, etc.
// SYNCHRONOUS methods BLOCK the event loop — nothing else runs until the operation finishes.
// Use sync methods only in startup/config scripts, NOT in request handlers.

// Interview Q: What is the difference between sync and async fs methods?
// A: Sync (e.g. readFileSync) blocks the thread until done — simpler but blocks all requests.
//    Async (e.g. readFile) is non-blocking — takes a callback, doesn't freeze the server.
//    In production servers always use async to keep the event loop free.

// Interview Q: What does the second argument 'utf-8' do in readFileSync?
// A: It tells Node to decode the file buffer as a UTF-8 string.
//    Without it, you get a raw Buffer object (binary data), not a readable string.

const { readFileSync, writeFileSync } = require("fs")

// Reads file contents synchronously — BLOCKS until file is fully read
// Returns a string because we passed 'utf-8' encoding
const first  = readFileSync("./content/first.txt", "utf-8")
const second = readFileSync("./content/second.txt", "utf-8")

// writeFileSync: creates the file if it doesn't exist, OVERWRITES if it does
// Use { flag: 'a' } as a third option to APPEND instead of overwrite
// Also BLOCKS until write is complete
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first}, ${second}`
)
