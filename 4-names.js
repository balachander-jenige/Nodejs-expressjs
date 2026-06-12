// ===== EXPORTING FROM A MODULE =====
// module.exports is the object that gets returned when this file is require()'d.
// You can export anything: object, function, class, array, primitive.

// Interview Q: How do you export multiple values in CommonJS?
// A: Use module.exports = { value1, value2 } to export an object with multiple properties.
//    The importer destructures or accesses them via dot notation.

// shared (exported) — visible to other files
const john = "john/"
const peter = "peter"

// local (NOT exported) — private to this file only
// This is the encapsulation benefit of modules.
const secret = "SUPER SECRET"  // stays hidden — never accessible outside this file

// Exporting as an object with shorthand property names
module.exports = {john, peter}
