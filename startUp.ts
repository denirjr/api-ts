import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import Database from './helpers/database';
import NewsController from './controller/newsController';
import Auth from './helpers/auth';
import uploads from './helpers/uploads';

class StartUp {
    public app: express.Application;
    private database: Database;
    private bodyParser;

    constructor() {
        this.app = express();
        this.database = new Database();
        this.database.createConnection();
        this.middler();
        this.routes();
    }

    private enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }
        this.app.use(cors(options))
    }

   private middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

   private routes() {

        // First application route
        this.app.route('/').get((_, res) => {
            res.send({ versao: '0.0.1' })
        });

        // Upload Route
        this.app.route('/uploads').post(uploads.single('file'), (_, res) => {
            try {
                res.send('Arquivo enviado com sucesso!');
            } catch (error) {
                console.log(error);
            }
        });

        // JWT Token to validate Routes 
        this.app.use(Auth.Validate);

        //new 
        this.app.route("/api/v1/news").get(NewsController.get);
        this.app.route("/api/v1/news/:id").get(NewsController.getById);
        this.app.route("/api/v1/news").post(NewsController.create);
        this.app.route("/api/v1/news/:id").put(NewsController.update);
        this.app.route("/api/v1/news/:id").delete(NewsController.delete);
    }
}

export default new StartUp();
