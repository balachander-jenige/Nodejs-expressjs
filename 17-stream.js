// ===== STREAMS =====
// Streams process data piece by piece (in chunks) instead of loading it all into memory.
// Essential for large files, video, live data, or piping data between sources.

// Interview Q: What are the 4 types of streams?
// A: 1. Readable  — you read data FROM it  (e.g. fs.createReadStream, http req)
//    2. Writable  — you write data TO it   (e.g. fs.createWriteStream, http res)
//    3. Duplex    — both readable & writable (e.g. TCP socket / net.Socket)
//    4. Transform — duplex that transforms data in-flight (e.g. zlib.createGzip for compression)

// Interview Q: What is a chunk / buffer in streams?
// A: Data is sent in chunks (Buffer objects by default). Default chunk size is 64KB (highWaterMark).
//    You can control chunk size with { highWaterMark: bytes } option.
//    Pass { encoding: 'utf8' } to get strings instead of Buffer objects.

// Interview Q: What is backpressure in streams?
// A: When a Readable produces data faster than a Writable can consume it, data piles up.
//    Node's pipe() handles backpressure automatically — it pauses the Readable when
//    the Writable's internal buffer is full, and resumes when it drains.

// Interview Q: What is the advantage of streams over readFileSync/readFile?
// A: readFileSync/readFile loads the ENTIRE file into RAM before processing.
//    A stream reads 64KB at a time — RAM usage stays constant even for a 10GB file.
//    Critical for file servers, video streaming, and large data processing.

const { createReadStream } = require('fs')

// createReadStream reads the file in chunks (default 64KB per chunk)
// Options:
//   highWaterMark: 90000  → each chunk will be ~90KB instead of default 64KB
//   encoding: 'utf8'      → chunks come as strings instead of Buffer objects
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('./content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt')

// 'data' event fires each time a new chunk is available
// BUG FIX: original code had stream.n('data', ...) — 'n' is a typo, must be stream.on(...)
stream.on('data', (result) => {
  console.log(result)   // result is a Buffer (or string if encoding was set)
})

// 'error' event fires if the file doesn't exist or can't be read
// Always attach an error listener — without it, an unhandled error crashes Node
stream.on('error', (err) => console.log(err))
