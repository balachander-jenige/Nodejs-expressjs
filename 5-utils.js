// ===== EXPORTING A SINGLE FUNCTION =====
// When a module exports only ONE thing, assign it directly to module.exports.
// The consumer gets the function itself (not wrapped in an object).

// Interview Q: What is the difference between module.exports and exports?
// A: 'exports' is a shorthand reference to module.exports.
//    exports.foo = fn  → adds a property (ok for multiple exports)
//    module.exports = fn → replaces the whole export (ok for single export)
//    If you reassign module.exports = something, the 'exports' shorthand breaks.

const sayHi = (name) => {
  console.log(`Hello world ${name}`)
}

// Exporting a single function directly — importer receives the function, not an object
module.exports = sayHi
