const funcs = {
    'start': () => console.log('on start !!'),
    'end': () => console.log('on end !!'),
    'counter': (count) => console.log(`count ${count} times`),
};

const steam = () => {

    let count = 0;
    setInterval(() => ++count && funcs.counter(count), 1000);

    funcs.start();
    funcs.end();
};

const getSteam = () => {

    steam.on = (event, listener) => funcs[event] = listener;
    return steam;
};

const newSteam = getSteam();
steam.on('start', () => console.log('the new start listener !!'));

// newSteam();
// setTimeout(newSteam, 1000);
// setTimeout(newSteam, 2000);

// 自製 EventEmitter
const getEmitter = () => {

    const events = {};

    const emitter = {
        on: (event, listener) => events[event] = listener,
        emit: (event, ...args) => events[event](...args),
        once: (event, listener) => events[event] = function () {
            listener(...arguments);
            events[event] = null;
        }
    };

    return emitter;
};

const emitter = getEmitter();
emitter.on('show-name', (firstName, lastName) => console.log(firstName, ',', lastName));
emitter.emit('show-name', 'Bob', 'Chang');
emitter.emit('show-name', 'Bob', 'Chang');