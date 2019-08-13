const sse = require('sse-channel');

const channel = new sse({
    cors: {
        origins: ['*'] // Defaults to []
    }
});

function bindClient(req, res) {
    console.log("event!")
    channel.addClient(req, res);
}

// use singleton object of the channel everytime
function getSSEChannel() {
    return channel;
}


module.exports = {
    bindClient,
    getSSEChannel
}