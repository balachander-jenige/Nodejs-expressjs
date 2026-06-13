// ===== HTTP SERVER USING EVENT EMITTER API =====
// http.createServer() has TWO equivalent styles:
//   Style 1 (shorthand): pass the callback directly → http.createServer((req, res) => {})
//   Style 2 (event API): create the server first, then use .on('request', handler)
// Both are identical — Style 1 is just syntactic sugar over Style 2.
// This file shows Style 2, proving that http.Server internally extends EventEmitter.

// Interview Q: How does http.Server relate to EventEmitter?
// A: http.Server extends EventEmitter. Every incoming HTTP request causes the server
//    to emit a 'request' event. You can listen for it with .on('request', (req,res)=>{}).
//    Other events: 'close', 'error', 'connect', 'upgrade'.

// Interview Q: What is the difference between the two createServer styles?
// A: No functional difference. http.createServer(cb) is shorthand for:
//      const server = http.createServer()
//      server.on('request', cb)
//    Understanding the event-based style helps you see Node's event-driven architecture.

const http = require('http')

// Style 1 (commented out) — shorthand, callback passed directly
// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Style 2 — explicit EventEmitter API
// createServer() with no args creates a server that emits 'request' on each HTTP request
const server = http.createServer()

// .on('request') subscribes to the 'request' event
// (req, res) are the same IncomingMessage and ServerResponse objects as Style 1
server.on('request', (req, res) => {
  res.end('Welcome')   // sends response body and closes connection
})

// listen() with no callback — server starts on port 5000 silently
// (In 12-http.js we passed a callback to log a confirmation message)
server.listen(5000)
