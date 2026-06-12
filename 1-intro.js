// ===== Node.js INTRO =====
// Node.js is a runtime environment that lets you run JavaScript outside the browser.
// It is built on Chrome's V8 engine (the same engine that runs JS in Google Chrome).
// Node.js is single-threaded and uses an event-driven, non-blocking I/O model.
// Great for: REST APIs, real-time apps, microservices.
// NOT ideal for: CPU-heavy tasks (image processing, heavy computation).

// Interview Q: What is Node.js?
// A: A JavaScript runtime built on V8 that executes JS server-side.
//    It uses an event loop for async non-blocking I/O.

const amount = 12

// Simple conditional: just basic JS running in Node (no browser needed)
if (amount < 10){
  console.log("Small Number")
}else{
  console.log("large Number")
}
