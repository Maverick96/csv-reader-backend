const getSSEChannel = require('../routes/event').getSSEChannel;

// returns a function which uses a singleton to send all SSE 
function getEventEmitter() {
    // use the 'channel' singleton object to send SSE
    const channel = getSSEChannel();
    let id = 1;
    return (event, data) => {
        const msg = {
            event,
            data,
            id
        };
        channel.send(JSON.stringify(msg));
        id++;
    }
}

module.exports = getEventEmitter;