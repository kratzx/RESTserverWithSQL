import express from 'express';
import { Application } from 'express';
//import cors from 'cors';
import config from '../../config';

//import userRoutes from '../routes/usuario';

class Server {

    private _app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this._app = express();
        this.port = config.port || '8000';

        // Métodos iniciales
        this.middlewares();
        this.routes();
    }

    middlewares() {


    }

    routes() {

    }

    get app() {
        return this._app;
    }

    closeServer() {

    }


    listen() {
       this._app.listen(this.port, () => {
           console.log('Server is listening on localhost:', this.port);
       });
    }

}

export default Server;