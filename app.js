require('dotenv').config();

const Server = require('./engines/server');

const server = new Server();

server.listen();