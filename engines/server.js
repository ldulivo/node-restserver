const express   = require('express');
const cors      = require('cors');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Reading and parse of body
        this.app.use( express.json() );

        // Folder public
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use('/api/users', require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port)
        })
    }
}

module.exports = Server;