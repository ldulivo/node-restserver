const express   = require('express');
const cors      = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;

        //Routes
        this.authPath = '/api/auth';
        this.userPath = '/api/users';

        // Connect database
        this.connectDatabase();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDatabase(){
        await dbConnection();
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
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port)
        })
    }
}

module.exports = Server;