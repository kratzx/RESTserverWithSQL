import * as express from 'express';
import { Application } from 'express';
import cors from 'cors';
import config from '../../config';
import { userRouter } from '../routes/user';

class Server {

    private _app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users/'
    }

    constructor() {
        this._app = express();
        this.port = config.port || '8080';

        this.middlewares();
        this.routes();
    }

    get app() {
        return this._app;
    }

    middlewares() {
        this._app.use( cors() );
        this._app.use( express.json() );
    }

    routes() {
        this._app.use(this.apiPaths.users, userRouter);
    }
    
    listen() {
        this._app.listen( this.port, () => {
            console.log('✅ Server running on PORT: ', this.port);
        });
    }
}

export default Server;