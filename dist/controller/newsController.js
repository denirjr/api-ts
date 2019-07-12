"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const responseHelper_1 = require("../helpers/responseHelper");
class NewsController {
    get(req, res) {
        newsService_1.default.get()
            .then(news => responseHelper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    getById(req, res) {
        const id = req.params.id;
        newsService_1.default.getById(id)
            .then(news => responseHelper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let news = req.body;
        newsService_1.default.create(news)
            .then(() => responseHelper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia cadastrada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const id = req.params.id;
        let news = req.body;
        newsService_1.default.update(id, news)
            .then(news => responseHelper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia foi atualizado com sucesso'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const id = req.params.id;
        newsService_1.default.delete(id)
            .then(() => responseHelper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia deletada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
