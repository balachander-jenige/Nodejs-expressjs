// ===== ROUTE PARAMS vs QUERY STRINGS =====
// Two ways to pass data in a URL:
//   Route param  → /api/products/2        → req.params.productID = '2'   (part of the path)
//   Query string → /api/v1/query?search=a → req.query.search = 'a'       (after the ?)

// Interview Q: When to use params vs query?
// A: Params  → identify a specific resource  e.g. /users/42 (required, part of route)
//    Query   → filter / sort / paginate      e.g. /products?search=shoe&limit=5 (optional)

// Interview Q: Why Number(productID)?
// A: req.params values are always STRINGS. product.id is a number, so === would fail without conversion.

// BUG NOTE: if !singleProduct, res.status(404).send() is called but there is no return.
// Code continues and calls res.json() on undefined — causes "Cannot set headers after they are sent".
// Fix: add return before res.status(404).send(...)

const express = require('express')
const app = express()
const { products } = require('./data')

// Home — HTML link to the products API
app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})

// GET all products — returns only id, name, image (strips sensitive fields)
// Selecting only needed fields before sending is called "projection" or "field filtering"
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product   // destructure — only expose safe fields
    return { id, name, image }
  })
  res.json(newProducts)
})

// Route parameter — :productID is a named placeholder, accessible via req.params.productID
// URL: /api/products/1  →  req.params = { productID: '1' }
app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params
  const singleProduct = products.find((product) =>
    product.id === Number(productID)   // convert string param to number for strict equality
  )
  if (!singleProduct) {
    return res.status(404).send("Product doesNot exist")  // return prevents double response
  }
  res.json(singleProduct)
})

// Multiple route params — both :productID and :reviewID are captured in req.params
// URL: /api/products/1/reviews/5  →  req.params = { productID: '1', reviewID: '5' }
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)   // { productID: '1', reviewID: '5' }
  res.send("helloworld")
})

// Query string — everything after '?' is in req.query as key-value pairs
// URL: /api/v1/query?search=a&limit=2  →  req.query = { search: 'a', limit: '2' }
app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query   // both are strings — convert limit with Number()
  let sortedProducts = [...products]    // spread to avoid mutating the original array

  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)   // case-sensitive filter
    )
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))  // take first N results
  }
  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] })  // return empty array, not 404
  }
  res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
