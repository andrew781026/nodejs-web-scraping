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


class EventEmitter {
    events = {};

    on = (event, listener) => this.events[event] = listener;
    emit = (event, ...args) => this.events[event] && this.events[event](...args);
    once = (event, listener) => {
        const self = this;
        self.events[event] = function () {
            listener(...arguments);
            self.events[event] = null;
        }
    }
}

const events = {EventEmitter};
const secondEmitter = new events.EventEmitter();
secondEmitter.on('show-city', (city, county) => console.log(city, ',', county));
secondEmitter.emit('show-city', 'Taipei', 'Taiwan');
secondEmitter.emit('show-city', 'California', 'US');
