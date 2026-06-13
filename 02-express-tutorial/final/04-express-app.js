// ===== EXPRESS APP — express.static() Middleware =====
// This shows how Express replaces the manual file-serving from 02-http-app.js
// with a single middleware call: app.use(express.static('./folder'))

// Interview Q: What is middleware in Express?
// A: A function that sits between the request and the response.
//    Signature: (req, res, next) => {}
//    It can: read/modify req & res, execute code, call next() to pass to the next middleware,
//    or end the request by sending a response.
//    Middleware runs in the ORDER it is registered with app.use().

// Interview Q: What is express.static()?
// A: A built-in Express middleware that serves static files (HTML, CSS, JS, images)
//    from a specified folder automatically.
//    app.use(express.static('./public')) → any file in /public is served at its filename URL.
//    e.g. /public/index.html → accessible at http://localhost:5000/index.html
//         /public/styles.css → accessible at http://localhost:5000/styles.css
//    It also sets the correct content-type header automatically.
//    No need to manually handle each file URL like in 02-http-app.js.

// Interview Q: Does express.static() need a route path?
// A: No. app.use(express.static('./public')) serves from root URL '/'.
//    You can optionally mount it at a sub-path:
//    app.use('/static', express.static('./public'))
//    → files are served at /static/filename instead of /filename

// Interview Q: What happens when express.static() can't find the file?
// A: It calls next() to pass control to the next middleware in the chain.
//    This allows a 404 handler registered after it to catch unmatched requests.

const express = require("express")
const path = require("path")   // path is imported but not used here — needed for res.sendFile()
const app = express()

// express.static: serves all files in ./navbar-app folder as static assets
// The browser can now request /index.html, /styles.css, /logo.svg etc. automatically
// This replaces ALL the if/else blocks from 02-http-app.js
app.use(express.static("./navbar-app"))

// app.get('/') is technically redundant here because express.static already serves
// index.html at '/'. It's left empty — could be removed or used to add custom logic.
app.get("/", (req, res) => {
  // express.static already handles '/' by serving index.html
  // If you needed to serve a different file: res.sendFile(path.resolve(__dirname, 'other.html'))
})

// 404 catch-all — catches anything express.static() couldn't find
// Because express.static calls next() on a miss, this handler gets it
app.use((req, res) => {
  res.status(404).send("Resource Not found")
})

app.listen(5000, () => {
  console.log("server is listening on port 5000")
})

// ===== FULL LIST OF EXPRESS HTTP METHODS (interview reference) =====
// app.get()    → read data
// app.post()   → create data
// app.put()    → replace entire resource
// app.patch()  → update part of a resource
// app.delete() → delete data
// app.all()    → match any HTTP method for a path
// app.use()    → middleware / catch-all (matches any method, path-prefix based)
// app.listen() → start server on a port
