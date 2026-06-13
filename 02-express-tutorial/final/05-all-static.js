// ===== ALL STATIC — Pure Static File Server =====
// The simplest possible Express server: no dynamic routes at all.
// Everything is served as static files from the /public folder.
// This is the pattern for serving a React/Vue/Angular build folder in production.

// Interview Q: What is the difference between SSR and static file serving?
// A: Static file serving → sends pre-built HTML/CSS/JS files as-is (no server logic).
//    SSR (Server-Side Rendering) → server generates HTML dynamically for each request
//    (e.g. using a template engine like EJS/Pug, or frameworks like Next.js).
//    express.static() is for static; res.render() is for SSR.

// Interview Q: What does res.sendFile() do and when would you use it?
// A: res.sendFile(absolutePath) sends a specific file as the HTTP response.
//    Requires an absolute path — use path.resolve(__dirname, 'file.html').
//    Used when you want to serve a specific HTML file for a route (SPA fallback pattern):
//    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')))
//    This is how React Router works in production — all routes return index.html.

// Interview Q: What is the difference between app.all('*') and app.use()?
// A: app.all('*', handler) → matches ALL HTTP methods for ALL paths (wildcard)
//    app.use(handler)       → matches ALL HTTP methods, path-prefix based (no path = all paths)
//    For a catch-all 404, both work. app.use() is more idiomatic for middleware.
//    app.all('*') is more explicit and is often used for the SPA fallback route.

const express = require('express')
const path = require('path')

const app = express()

// express.static('./public') — serves all files in the /public folder
// index.html inside /public is automatically served at '/'
// Any file in /public is accessible at its filename URL
// Great for hosting a React/Vue/Angular build: just point to the /build or /dist folder
app.use(express.static('./public'))

// Alternative: serve a specific HTML file for the root route (commented out)
// res.sendFile requires an ABSOLUTE path — use path.resolve() for that
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })
// SSR pattern: above generates/sends a file dynamically for that route

// app.all('*') — wildcard catch-all for all HTTP methods and all paths
// Placed AFTER express.static so it only catches files that don't exist in /public
// In a React SPA you'd send index.html here instead of a 404
app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})

// ===== SUMMARY: EVOLUTION ACROSS THESE 5 FILES =====
// 01-http-basics.js → raw Node http, manual routing with if/else, res.writeHead()
// 02-http-app.js    → raw Node http, manual static file serving (one block per file)
// 03-express-basics.js → Express routing (app.get), res.status().send(), 404 middleware
// 04-express-app.js → express.static() replaces manual file handling, middleware chain
// 05-all-static.js  → purest form: just express.static + wildcard 404, no dynamic routes
