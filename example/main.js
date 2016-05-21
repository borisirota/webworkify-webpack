var commonWorker = require('./common-js-worker.js');
import es6Worker from './es6-worker.js';

var work = require('../');


var w1 = work(commonWorker);
w1.addEventListener('message', function (ev) {
    console.log('CommonJS Worker:', ev.data);
});

w1.postMessage(4); // send the worker a message

var w2 = work(es6Worker);
w2.addEventListener('message', function (ev) {
    console.log('ES6 Worker', ev.data);
});

w2.postMessage(4); // send the worker a message
