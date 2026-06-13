// ===== HTTP BASICS — Raw Node.js HTTP Server =====
// This is pure Node.js with NO framework. Shows how routing works at the lowest level.
// In real projects you'd use Express on top of this, but knowing raw http is important.

// Interview Q: What does res.writeHead() do?
// A: Sets the HTTP status code and response headers BEFORE sending the body.
//    Must be called before res.write() or res.end().
//    e.g. res.writeHead(200, { 'content-type': 'text/html' })
//    Common status codes:
//      200 - OK (success)
//      201 - Created (POST success)
//      400 - Bad Request
//      401 - Unauthorized
//      403 - Forbidden
//      404 - Not Found
//      500 - Internal Server Error

// Interview Q: What is the difference between res.write() and res.end()?
// A: res.write(data) → sends a chunk of the response body (can call multiple times)
//    res.end(data?)  → signals that the response is complete; optionally sends final data
//    You MUST call res.end() — without it the client hangs waiting for more data.
//    res.end('text') is shorthand for res.write('text') + res.end()

// Interview Q: What is content-type and why does it matter?
// A: It tells the browser HOW to interpret the response body.
//    'text/html'       → render as HTML
//    'text/css'        → apply as stylesheet
//    'text/javascript' → execute as JS
//    'application/json'→ parse as JSON
//    'image/svg+xml'   → render as SVG image
//    Without it, browsers may guess wrong and display raw text instead of rendering.

const http = require('http')

const server = http.createServer((req, res) => {
  // req.method → 'GET', 'POST', 'PUT', 'DELETE', etc.
  // console.log(req.method)

  const url = req.url   // the path after the domain: '/', '/about', '/contact'

  // Home page route
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>home page</h1>')
    res.end()  // must always call end() to complete the response
  }
  // About page route
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end()
  }
  // Catch-all 404 — any unmatched URL lands here
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

// Bind the server to port 5000 — visit http://localhost:5000 to test
server.listen(5000)
