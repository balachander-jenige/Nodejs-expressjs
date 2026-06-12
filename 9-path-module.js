// ===== PATH MODULE (Built-in) =====
// The 'path' module provides utilities for working with file and directory paths.
// It handles OS differences automatically (Windows uses \, Linux/Mac uses /).
// No install needed — built into Node.js.

// Interview Q: What does path.join() vs path.resolve() do?
// A: path.join()    → joins segments using the OS separator (relative-friendly)
//    path.resolve() → builds an ABSOLUTE path from right to left, uses __dirname as base
//                     if no absolute segment is found it uses cwd as the starting point

// Interview Q: What is path.basename()?
// A: Returns the last portion of a path (the filename with extension).
//    e.g. path.basename('/content/subfolder/test.txt') → 'test.txt'

const path = require('path')

// path.sep → the OS-specific path separator ('/' on Linux/Mac, '\' on Windows)
console.log(path.sep)   // '/'

// path.join: safely joins path parts with the correct separator
// result: '/content/subfolder/test.txt'
const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

// path.basename: extracts just the filename from a full path
// result: 'test.txt'
const base = path.basename(filePath)
console.log(base)

// path.resolve: creates an absolute path by combining __dirname with the given segments
// __dirname is the current file's directory — so this always gives an absolute path
// result: e.g. '/home/user/project/content/subfolder/test.txt'
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
