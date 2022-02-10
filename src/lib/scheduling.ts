// Schedules a task to run later.  Use Node.js's setImmediate if available and
// setTimeout otherwise.  Note that options like process.nextTick or
// queueMicrotask will likely not work: IndexedDB semantics require that
// transactions are marked as not active when the event loop runs. The next
// tick queue and microtask queue run within the current event loop macrotask,
// so they'd process database operations too quickly.
export const queueTask: (fn: () => void) => void = (fn: () => void) => setTimeout(fn, 0);
