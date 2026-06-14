// ===== MIDDLEWARE OPTIONS — Third-Party & Multiple Middleware =====
// Besides writing your own middleware, you can use third-party npm packages.
// morgan is a popular HTTP request logger middleware for Express.

// Interview Q: What is morgan?
// A: A third-party Express middleware for logging HTTP requests automatically.
//    Install: npm install morgan
//    Usage: app.use(morgan('tiny'))
//    Formats: 'tiny' (minimal), 'dev' (colored, for development), 'combined' (Apache-style for prod)
//    Saves you from writing a manual logger like in 08/09 files.

// Interview Q: What are the types of middleware in Express?
// A: 1. Built-in     → express.static(), express.json(), express.urlencoded()
//    2. Third-party  → morgan (logging), cors (cross-origin), helmet (security), body-parser
//    3. Custom       → functions you write yourself: (req, res, next) => {}
//    4. Error-handling → (err, req, res, next) => {} — 4 arguments, registered last

// Interview Q: What does express.json() middleware do?
// A: Parses incoming requests with JSON body and populates req.body.
//    Without it, req.body is undefined for POST/PUT requests with JSON payload.
//    Usage: app.use(express.json())
//    Replaces the old body-parser npm package (now built into Express).

// Interview Q: What is the authorize middleware pattern?
// A: A custom middleware that checks if the request has a valid token/session.
//    If valid → attaches user to req.user and calls next()
//    If invalid → sends 401 Unauthorized and does NOT call next()

const express = require('express')
const app = express()
const morgan = require('morgan')       // third-party logger — npm install morgan
const logger = require('./logger')     // custom logger from separate file (modular pattern)
const authorize = require('./authorize') // custom auth middleware from separate file

// Multiple middleware at once — applied to all routes below
// app.use([logger, authorize])   ← array syntax: runs logger first, then authorize

// express.static — serve public folder as static assets
// app.use(express.static('./public'))

// morgan('tiny') logs: METHOD URL STATUS RESPONSE-TIME
// e.g.  GET /api/products 200 2.456 ms
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  // req.user set by authorize middleware (if it were active)
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

// ===== MIDDLEWARE SUMMARY (interview cheat sheet) =====
// express.json()          → parse JSON body → req.body
// express.urlencoded()    → parse form data → req.body
// express.static(folder)  → serve static files
// morgan('dev')           → HTTP request logging
// cors()                  → allow cross-origin requests (frontend on different port)
// helmet()                → sets secure HTTP headers
// Custom: (req,res,next) => { /* logic */ next() }
// Error: (err,req,res,next) => { res.status(500).json({ msg: err.message }) }
