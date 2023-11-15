var fs = require('fs')
const eventEmitter = require('events')
const { buffer } = require('node:stream/consumers')
// fs.readFile('../1.txt', (e, results) => {
//     console.log(results)
//     let buffer = Buffer.from(results)
//     console.log(buffer.toString('utf-8', results))
// })
// fs.stat('../1.txt', (e, r) => {
//     console.log(r)
// })

// let myEmitter = new eventEmitter();
// myEmitter.on('ruansheng', () => {
//     console.log('ruansheng  emitter')
// })
// myEmitter.on('ruansheng', () => {
//     console.log('ruansheng1  emitter')
// })
// myEmitter.emit('ruansheng')
// console.log(myEmitter.eventNames())
console.log(process.pid)