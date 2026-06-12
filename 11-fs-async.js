// ===== FS MODULE — ASYNCHRONOUS (Built-in) =====
// Async fs methods are NON-BLOCKING — they hand off the work to the OS,
// then continue executing the next lines. The callback fires when the task is done.
// This is the correct approach for production servers.

// Interview Q: What is a callback function?
// A: A function passed as an argument to another function, to be executed after
//    that function completes. Node uses error-first callbacks: (err, result) => {}
//    First arg is always the error (null if none), second is the result.

// Interview Q: What is "callback hell"?
// A: When you nest many callbacks inside each other, the code becomes deeply indented
//    and hard to read/maintain — also called the "pyramid of doom".
//    Solutions: Promises, async/await, or named functions to flatten the structure.

// Interview Q: What is the Node.js event loop?
// A: The mechanism that allows Node to do non-blocking I/O despite being single-threaded.
//    It offloads async operations (file I/O, timers, network) to the system kernel,
//    then picks up their callbacks when they complete and runs them one at a time.
//    That's why console.log('starting next task') prints BEFORE 'done with this task'.

const { readFile, writeFile } = require("fs")

console.log('start')   // prints 1st — synchronous, runs immediately

// readFile is async — registers the callback and moves on immediately
readFile('./content/first.txt', 'utf8', (err, result) => {
  // This callback runs only AFTER the file is read (non-blocking)
  if (err) {
    console.log(err)
    return  // stop if there's an error — important pattern to avoid crashes
  }
  const first = result

  // Nested readFile — demonstrates callback hell: each async step must nest inside the previous
  readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result

    // writeFile async: creates/overwrites the file, then calls the callback
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')  // prints 3rd (last — after all async work)
      }
    )
  })
})

// This runs 2nd — BEFORE the callbacks above, because readFile is non-blocking
console.log('starting next task')
