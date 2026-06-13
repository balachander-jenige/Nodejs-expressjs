// ===== EVENT EMITTER =====
// Node's 'events' module implements the Observer / Pub-Sub pattern.
// EventEmitter lets you create custom events, emit them, and listen for them.
// Many built-in Node modules (http.Server, fs streams, net.Socket) extend EventEmitter.

// Interview Q: What is the EventEmitter pattern?
// A: A pub-sub (publish-subscribe) pattern where:
//    - .on(event, listener)   → subscribe: register a listener for an event
//    - .emit(event, ...args)  → publish: trigger the event and pass data to all listeners
//    - .once(event, listener) → listen only the FIRST time the event fires, then auto-remove
//    - .off(event, listener)  → unsubscribe / remove a specific listener
//    Multiple listeners can be registered for the same event — they all fire in order.

// Interview Q: When would you use EventEmitter directly?
// A: When building custom modules that need to notify other parts of the app about
//    something happening — e.g. a data pipeline, a job queue, or a real-time chat system.
//    For simple cases you create an instance; for reusable classes you extend EventEmitter.

const EventEmitter = require('events')

// Create an instance of EventEmitter to emit and listen to custom events
const customEmitter = new EventEmitter()

// .on() registers a listener — fires every time 'response' event is emitted
// You can register MULTIPLE listeners for the same event — they all run in registration order
customEmitter.on('response', (name, id) => {
  // Arguments passed to emit() are received here as parameters
  console.log(`data recieved user ${name} with id:${id}`)
})

// Second listener on the same 'response' event — both will fire when emit() is called
customEmitter.on('response', () => {
  console.log('some other logic here')
})

// .emit() triggers the event and passes arguments to every registered listener
// Output:
//   "data recieved user john with id:34"
//   "some other logic here"
customEmitter.emit('response', 'john', 34)
