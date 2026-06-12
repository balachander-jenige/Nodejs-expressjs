// ===== MODULE WITHOUT EXPORTS (no module.exports) =====
// If a file has no module.exports, requiring it returns an empty object {}.
// The file's variables are private and inaccessible from outside.

// Interview Q: What happens if you require() a file with no module.exports?
// A: You get back an empty object {}. The file still executes, but nothing is shared.

// 'items' is local — not exported, not accessible from 3-modules.js
const items = ["icecream", "chicken"]
