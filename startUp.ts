import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import Database from './helpers/database';
import uploads from './helpers/uploads';
import newsRouter from './router/newsRouter';

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
        this.app.use(compression());
        this.app.use('/exports-files', express.static(process.cwd() + '/exports-files'));
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

        // JWT Token to validate Routes Middler 
        // this.app.use(Auth.Validate);

        //new router
        this.app.use('/', newsRouter);
    }
}

export default new StartUp();
