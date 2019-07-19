"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database_1 = require("./helpers/database");
const newsController_1 = require("./controller/newsController");
const auth_1 = require("./helpers/auth");
const uploads_1 = require("./helpers/uploads");
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
        // JWT Token to validate Routes 
        this.app.use(auth_1.default.Validate);
        //new 
        this.app.route("/api/v1/news").get(newsController_1.default.get);
        this.app.route("/api/v1/news/:id").get(newsController_1.default.getById);
        this.app.route("/api/v1/news").post(newsController_1.default.create);
        this.app.route("/api/v1/news/:id").put(newsController_1.default.update);
        this.app.route("/api/v1/news/:id").delete(newsController_1.default.delete);
    }
}
exports.default = new StartUp();
