// ===== MIDDLEWARE BASICS =====
// Middleware = a function that runs BETWEEN the request arriving and the response being sent.
// Signature: (req, res, next) => {}
//   req  → the incoming request
//   res  → the outgoing response
//   next → call this to pass control to the next middleware/route handler
// If you don't call next() AND don't send a response → request hangs forever.

// Interview Q: What can middleware do?
// A: Run any code, modify req/res, end the request (send response), or call next().
//    Common uses: logging, authentication, parsing JSON body, error handling, CORS.

// Interview Q: Ways to apply middleware in Express?
// A: 1. Route-level  → app.get('/path', middlewareFn, handlerFn)  — applies to ONE route
//    2. App-level    → app.use(middlewareFn)  — applies to ALL routes below it
//    3. Third-party  → app.use(morgan('tiny'))  — installed via npm

const express = require('express')
const app = express()

// Custom logger middleware — logs method, URL, and year for every request it's attached to
const logger = (req, res, next) => {
  const method = req.method           // GET, POST, etc.
  const url = req.url                 // /about, /api/products, etc.
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next()   // MUST call next() to hand off to the route handler below
}

// Route-level middleware — logger runs only for these specific routes
// Middleware functions are listed between the path and the final handler
app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})
// Problem: if there are 15 routes, you must add logger to each one manually.
// Solution: use app.use(logger) — see 09-middleware-use.js

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
