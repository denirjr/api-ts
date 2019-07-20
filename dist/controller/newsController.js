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
                this.errorMessageParser(error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let result = yield newsService_1.default.getById(id);
                responseHelper_2.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                this.errorMessageParser(error);
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
                this.errorMessageParser(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let news = req.body;
                yield newsService_1.default.update(id, news);
                responseHelper_1.default.sendResponse(res, HttpStatus.OK, 'Noticia foi atualizado com sucesso');
            }
            catch (error) {
                this.errorMessageParser(error);
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
                this.errorMessageParser(error);
            }
        });
    }
    errorMessageParser(error) {
        return console.error(error);
    }
}
exports.default = new NewsController();
