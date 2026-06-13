// ===== EXPRESS BASICS — Routing =====
// Express is a minimal, unopinionated web framework for Node.js.
// It wraps Node's http module and adds: clean routing, middleware, res helpers.

// Interview Q: What is Express.js?
// A: A fast, minimal web framework built on Node's http module.
//    It provides routing (app.get/post/put/delete), middleware support,
//    and helper methods like res.send(), res.json(), res.status(), res.sendFile().
//    Install: npm install express

// Interview Q: What is the difference between app.get() and app.use()?
// A: app.get(path, handler) → matches only GET requests on that exact path
//    app.use(path?, handler) → matches ALL HTTP methods on any path that STARTS WITH the given path
//                              If no path given, matches every request (used for middleware & 404)
//    Order matters — Express checks routes top to bottom and stops at the first match.

// Interview Q: What is app.all()?
// A: Matches ALL HTTP methods (GET, POST, PUT, DELETE etc.) for a specific path.
//    app.all('*', handler) → wildcard catch-all (same use as app.use for 404s).
//    Prefer app.use() for middleware; app.all() for route-specific multi-method handlers.

// Interview Q: How does Express routing order matter?
// A: Express matches routes TOP TO BOTTOM. Put specific routes before catch-alls.
//    If you put app.use (404 handler) at the TOP, it catches everything and nothing else runs.
//    Always put the 404 handler LAST.

// Interview Q: What does res.status().send() do?
// A: res.status(code) sets the HTTP status code (returns res for chaining).
//    res.send(data) sends the response body and ends the connection.
//    For JSON: res.json({ key: 'value' }) → sets content-type to application/json automatically.
//    res.send() auto-detects content-type: string → text/html, object → application/json.

const express = require("express")
const app = express()   // creates an Express application instance

// app.get(path, callback) — handles HTTP GET requests to '/'
// req: request object (url, method, headers, params, query, body)
// res: response object (send, json, status, redirect, sendFile, render)
app.get("/", (req, res) => {
  console.log('user hit the resource')
  res.status(200).send('Home page')   // status(200) is optional here — 200 is the default
})

app.get("/about", (req, res) => {
  res.status(200).send("about Page")
})

// 404 catch-all — app.use() with no path matches EVERY unmatched request
// MUST be the LAST route — if placed first it would catch everything
// Note: app.all() used to be preferred here but app.use() is the current standard
app.use((req, res) => {
  res.status(404).send("Resource Not Found")
})

// Start the server — app.listen() is shorthand for http.createServer(app).listen()
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
