// ===== PROMISES & ASYNC/AWAIT =====

// Interview Q: What is a Promise?
// A: An object representing the eventual completion (or failure) of an async operation.
//    3 states: pending → fulfilled (resolved) OR rejected
//    Created with: new Promise((resolve, reject) => { ... })
//    Consumed with: .then(result => {}).catch(err => {})

// Interview Q: What is util.promisify()?
// A: A Node utility that wraps a callback-based function and returns a Promise version.
//    Works on any function that follows the error-first callback pattern (err, result).
//    e.g. util.promisify(fs.readFile) → returns a function that returns a Promise.

// Interview Q: What is async/await?
// A: Syntactic sugar over Promises. Makes async code look synchronous and easier to read.
//    'async' before a function makes it always return a Promise.
//    'await' pauses execution inside the async function until the Promise resolves.
//    Use try/catch for error handling (replaces .catch()).

// Interview Q: Callbacks vs Promises vs async/await?
// A: Callbacks → simple but leads to callback hell with nested async operations
//    Promises  → flat chaining with .then()/.catch(), better readability
//    async/await → cleanest syntax, best for sequential async steps, uses try/catch

const { readFile, writeFile } = require("fs")
const util = require('util')

// util.promisify wraps the callback-based fs functions into Promise-based versions
// NOTE: variable names must differ from the imported names above to avoid redeclaration
const readFilePromise  = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

// ---- MANUAL PROMISE APPROACH (commented out) ----
// This shows how you'd manually wrap a callback function in a Promise:
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err)     // on error → promise goes to rejected state
//       } else {
//         resolve(data)   // on success → promise goes to fulfilled state
//       }
//     })
//   })
// }
// getText("./content/first.txt")
//   .then((result) => console.log(result))   // runs on resolve
//   .catch((err)   => console.log(err))      // runs on reject

// ---- ASYNC/AWAIT APPROACH ----
// 'async' makes the function return a Promise automatically
const start = async () => {
  try {
    // 'await' pauses here until readFilePromise resolves — no nesting needed
    const first  = await readFilePromise("./content/first.txt", "utf-8")
    const second = await readFilePromise("./content/second.txt", "utf-8")

    // These two reads above run SEQUENTIALLY (one after the other).
    // For concurrent reads you'd use: const [first, second] = await Promise.all([...])

    await writeFilePromise(
      "./content/mind-grenade.txt",
      `This is awesome ${first} ${second}`
    )
    console.log(first, second)
  } catch (error) {
    // try/catch replaces .catch() — catches any rejected Promise inside the try block
    console.log(error)
  }
}

start()  // call the async function — it returns a Promise but we don't need to handle it here
