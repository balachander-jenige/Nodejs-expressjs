// ===== HTTP APP — Serving Static Files with Raw Node.js =====
// This shows WHY we need Express. With raw http, you must manually handle every
// file request (HTML, CSS, JS, images) — one if/else block per resource.
// Express's express.static() replaces ALL of this with a single line.

// Interview Q: Why do browsers make multiple HTTP requests for one page?
// A: The browser loads index.html first, parses it, then makes separate requests
//    for each linked resource: stylesheets, scripts, images, fonts etc.
//    Each <link>, <script>, <img> tag triggers its own HTTP GET request.
//    That's why this server needs routes for /styles.css, /logo.svg, /browser-app.js.

// Interview Q: Why are static files read with readFileSync at startup (not inside the handler)?
// A: Reading files inside the request handler would re-read from disk on EVERY request.
//    Reading once at startup loads them into memory — much faster for repeated requests.
//    This is a caching pattern. Express.static() does this automatically.

// Interview Q: What problem does Express solve compared to raw http?
// A: Raw http requires manual routing for every URL, manual content-type headers,
//    manual file reading, no middleware support, no JSON parsing, verbose code.
//    Express provides: clean routing (app.get/post), middleware, express.static(),
//    res.json(), res.sendFile(), automatic content-type detection, and much more.

const http = require('http')
const { readFileSync } = require('fs')

// Read all static assets ONCE at startup — cached in memory for all future requests
// readFileSync with no encoding returns a raw Buffer (binary safe for all file types)
const homePage   = readFileSync("./navbar-app/index.html")
const homeStyles = readFileSync("./navbar-app/styles.css")
const homeImage  = readFileSync("./navbar-app/logo.svg")
const homeLogic  = readFileSync("./navbar-app/browser-app.js")

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)   // logs every incoming request URL — useful for debugging

  // Serve the HTML page — browser requests '/' first
  if (url === "/") {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)
    res.end()
  }
  // About page — plain text response (no file)
  else if (url === "/about") {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write("about the page")
    res.end()
  }
  // Browser requests CSS after parsing the <link> tag in index.html
  else if (url === "/styles.css") {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.write(homeStyles)
    res.end()
  }
  // Browser requests the SVG image after parsing the <img> tag
  else if (url === "/logo.svg") {
    res.writeHead(200, { 'content-type': 'image/svg+xml' })
    res.write(homeImage)
    res.end()
  }
  // Browser requests the JS file after parsing the <script> tag
  else if (url === "/browser-app.js") {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.write(homeLogic)
    res.end()
  }
  // 404 catch-all for any unrecognised URL
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>Page not found</h1>')
    res.end()
  }
})

server.listen(5000)

// ===== KEY TAKEAWAY FOR INTERVIEWS =====
// Express.js is a minimal web framework built ON TOP of Node's http module.
// It simplifies: routing, middleware, static file serving, JSON handling.
// express.static() replaces ALL the if/else blocks above with one line.
// This file exists to show the pain point Express was designed to solve.
