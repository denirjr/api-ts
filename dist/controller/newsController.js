"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const redis = require("redis");
const responseHelper_1 = require("../helpers/responseHelper");
const responseHelper_2 = require("../helpers/responseHelper");
const newsService_2 = require("../services/newsService");
const exportFiles_1 = require("../helpers/exportFiles");
class NewsController {
    get(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Docker Compose
                // let client = redis.createClient(6379, "redis");
                // Localhost
                let client = redis.createClient();
                yield client.get('news', (_, reply) => __awaiter(this, void 0, void 0, function* () {
                    if (reply) {
                        console.log('redis');
                        responseHelper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                    }
                    else {
                        let result = yield newsService_1.default.get();
                        console.log('db');
                        client.set('news', JSON.stringify(result));
                        client.expire('news', 20);
                        responseHelper_2.default.sendResponse(res, HttpStatus.OK, result);
                    }
                }));
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const term = req.params.term;
                const page = NewsController.searchByPageParams(req);
                const itemsByPage = NewsController.searchItemsByPageParams(req);
                let result = yield newsService_1.default.search(term, page, itemsByPage);
                responseHelper_2.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    static searchByPageParams(req) {
        return (req.param('page')) ? parseInt(req.param('page')) : 1;
    }
    static searchItemsByPageParams(req) {
        return (req.param('limit')) ? parseInt(req.param('limit')) : 10;
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let result = yield newsService_1.default.getById(id);
                responseHelper_2.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    exportToCSv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield newsService_2.default.get();
                let fileName = exportFiles_1.default.toCsv(response);
                responseHelper_2.default.sendResponse(res, HttpStatus.OK, req.get('host') + '/exports-files/' + fileName);
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = req.body;
                let successMessage = 'Noticia cadastrada com sucesso!';
                yield newsService_1.default.create(news);
                responseHelper_1.default.sendResponse(res, HttpStatus.OK, `${successMessage}`);
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let news = req.body;
                let successMessage = 'Noticia foi atualizado com sucesso';
                yield newsService_1.default.update(id, news);
                responseHelper_1.default.sendResponse(res, HttpStatus.OK, `${successMessage}`);
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield newsService_1.default.delete(id);
                responseHelper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia deletada com sucesso!');
            }
            catch (error) {
                return console.error(error);
            }
        });
    }
}
exports.default = new NewsController();
