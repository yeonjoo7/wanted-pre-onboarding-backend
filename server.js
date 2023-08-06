'use strict';

const model = require('./common/model');
const { createServer } = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = createServer(app);

const serverListen = async () => {
    try {
        await model.syncDB();
        await server.listen(port, () => {
            console.log('listening on port ', port)
        })
    } catch (e) {
        await model.disconnectDB();
    }
}

serverListen();