const logEvents = require('./logEvents-5-emitter');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{};

//initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    //emit events
    myEmitter.emit('log', 'Write this message');
}, 2000);
