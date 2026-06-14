// ===== SENDING JSON WITH EXPRESS =====
// res.json() → sends data as JSON and automatically sets content-type: application/json
// res.send() → sends string/HTML; if you pass an object it also becomes JSON (but use res.json() explicitly)
// This is the foundation of a REST API — client gets structured data, not HTML.

// Interview Q: What is a REST API?
// A: An API that uses HTTP methods (GET/POST/PUT/DELETE) to perform CRUD operations.
//    Returns JSON data. Stateless — each request is independent.

const express = require('express')
const app = express()

// { products } is destructured from data.js — data.js exports an object with a products array
const { products } = require('./data')

app.get('/', (req, res) => {
  // res.json() serialises the JS array to JSON string and sends it
  // Sets Content-Type: application/json automatically
  res.json(products)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
