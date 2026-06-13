// ===== EVENT LOOP, ASYNC PATTERNS, EVENT EMITTER, STREAMS =====

// Interview Q: What is the Node.js Event Loop?
// A: The event loop is the core mechanism that makes Node non-blocking despite being
//    single-threaded. It continuously checks if the call stack is empty, then picks
//    up pending callbacks from the queue and executes them one at a time.
//    Order of phases: timers → I/O callbacks → idle → poll → check → close callbacks

// Interview Q: What are the async patterns in Node.js?
// A: 1. Callbacks   — original pattern; error-first (err, result) => {}
//                     Problem: callback hell / pyramid of doom
//    2. Promises    — cleaner chaining with .then().catch(); avoids deep nesting
//    3. async/await — syntactic sugar over Promises; reads like synchronous code
//                     Uses try/catch for error handling

// Interview Q: What is the EventEmitter?
// A: A class from the 'events' module. It implements the observer/pub-sub pattern.
//    .on(event, listener) — subscribe to an event
//    .emit(event, ...args) — trigger the event, passing data to all listeners
//    Built-in Node modules (http, fs streams) extend EventEmitter internally.

// Interview Q: What are Streams?
// A: Streams handle data piece by piece instead of loading it all into memory at once.
//    4 types:
//    - Readable  — source of data (e.g. fs.createReadStream, http request)
//    - Writable  — destination for data (e.g. fs.createWriteStream, http response)
//    - Duplex    — both readable and writable (e.g. TCP socket)
//    - Transform — duplex that can modify data as it passes through (e.g. zlib.createGzip)

// ===== Demonstrating the Event Loop =====

console.log("first")   // 1st — synchronous, runs immediately on the call stack

// setInterval registers a timer. After 2000ms the callback is pushed to the timer queue.
// The event loop only picks it up once the call stack is clear.
setInterval(() => {
  console.log("Hello world")   // runs every 2s — AFTER "Second" is already printed
}, 2000)

console.log("Second")   // 2nd — synchronous, runs before any async callback
// Output order: "first" → "Second" → "Hello world" (every 2s)
// This proves the event loop: sync code runs first, async callbacks run later
