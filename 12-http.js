// ===== HTTP MODULE (Built-in) =====
// The 'http' module lets you create a web server without any framework (no Express needed).
// In real projects you'd use Express on top of this, but understanding raw http is important.

// Interview Q: How does Node.js handle HTTP requests?
// A: http.createServer() creates a server. For every incoming request, it fires the
//    callback with (req, res). req has the request details, res is used to send back data.
//    server.listen() binds the server to a port and starts accepting connections.

// Interview Q: What is req and res?
// A: req (IncomingMessage) — contains request info: req.url, req.method, req.headers
//    res (ServerResponse) — used to send the response: res.end(), res.write(), res.setHeader()

// Interview Q: Why does Express exist if Node has a built-in http module?
// A: The raw http module is low-level — no routing, no middleware, no JSON parsing.
//    Express adds routing, middleware, cleaner API, and many utilities on top of http.

const http = require("http")

// createServer returns a server object.
// The callback (request listener) fires on EVERY incoming HTTP request.
const server = http.createServer((req, res) => {

  // req.url is the path after the domain e.g. '/', '/about', '/contact'
  if (req.url === "/") {
    return res.end("welcome to my page")   // res.end() sends response & closes connection
  }

  if (req.url === "/about") {
    return res.end("ur are short history")
  }

  // Fallback route — like a 404 page (though status code isn't set here)
  // In Express this would be a 404 middleware
  res.end("<h1> OOPs</h1>")
})

// listen(port, callback) — binds the server to port 5000
// Callback fires once the server is successfully listening
// Visit http://localhost:5000 to test
server.listen(5000, () => {
  console.log("Server running on port 5000")
})
