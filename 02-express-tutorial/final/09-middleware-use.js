// ===== APP-LEVEL MIDDLEWARE WITH app.use() =====
// Instead of adding middleware to every route manually (08-middleware-basic.js),
// app.use(middlewareFn) applies it GLOBALLY to all routes that come AFTER it.

// Interview Q: What is the golden rule of middleware order in Express?
// A: Middleware runs TOP TO BOTTOM in the order it's registered.
//    app.use(logger) MUST be placed ABOVE the routes you want it to run on.
//    If placed below a route, that route won't go through the middleware.

// Interview Q: How do you apply multiple middleware functions at once?
// A: app.use([logger, authorize]) — pass an array. They run left to right.
//    Each must call next() to pass to the next one.

// Interview Q: What is req.user?
// A: req.user is not a built-in Express property. It's a convention.
//    An auth middleware (like passport.js or a custom JWT middleware) verifies
//    the token, then attaches the user object to req.user so route handlers can use it.
//    e.g. req.user = { id: 1, name: 'John' }

const express = require('express')
const app = express()

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next()   // pass to next middleware or route handler
}

// app.use(logger) — applies logger to ALL routes registered BELOW this line
// This replaces writing logger in every single app.get() call
app.use(logger)

app.get("/", (req, res) => {
  res.send("home page")
})

app.get('/about', (req, res) => {
  res.send("About Page")
})

app.get('/api/products', (req, res) => {
  res.send('Products')
})

app.get('/api/items', (req, res) => {
  // req.user would be set by an auth middleware (not present here, so it's undefined)
  // In a real app: check if req.user exists before proceeding
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
