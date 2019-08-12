"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const database_1 = require("./helpers/database");
const uploads_1 = require("./helpers/uploads");
const newsRouter_1 = require("./router/newsRouter");
class StartUp {
    constructor() {
        this.app = express();
        this.database = new database_1.default();
        this.database.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
    }
    routes() {
        // First application route
        this.app.route('/').get((_, res) => {
            res.send({ versao: '0.0.1' });
        });
        // Upload Route
        this.app.route('/uploads').post(uploads_1.default.single('file'), (_, res) => {
            try {
                res.send('Arquivo enviado com sucesso!');
            }
            catch (error) {
                console.log(error);
            }
        });
        // JWT Token to validate Routes Middler 
        // this.app.use(Auth.Validate);
        //new router
        this.app.use('/', newsRouter_1.default);
    }
}
exports.default = new StartUp();
