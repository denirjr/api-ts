import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import ResponseHelper from '../helpers/responseHelper';
import responseHelper from '../helpers/responseHelper';
import newsService from '../services/newsService';

import ExportFiles from '../helpers/exportFiles';

class NewsController {

    async get(_, res) {
        try {
            // Docker Compose
            // let client = redis.createClient(6379, "redis");

            // Localhost
            let client = redis.createClient();

            await client.get('news', async (_, reply) => {
                if (reply) {
                    console.log('redis');
                    ResponseHelper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await NewsService.get();
                    console.log('db');
                    client.set('news', JSON.stringify(result));
                    client.expire('news', 20);
                    responseHelper.sendResponse(res, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            return console.error(error);
        }
    }

    async search(req, res) {
        try {
            const term = req.params.term;
            const page = NewsController.searchByPageParams(req)
            const itemsByPage = NewsController.searchItemsByPageParams(req);

            let result = await NewsService.search(term, page, itemsByPage);
            responseHelper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            return console.error(error);
        }
    }

    private static searchByPageParams(req): number {
        return (req.param('page')) ? parseInt(req.param('page')) : 1;
    }
    private static searchItemsByPageParams(req): number {
        return (req.param('limit')) ? parseInt(req.param('limit')) : 10;
    }

    async getById(req, res) {
        try {
            const id = req.params.id
            let result = await NewsService.getById(id)
            responseHelper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            return console.error(error);
        }
    }

    async exportToCSv(req, res) {
        try {
            let response = await newsService.get();
            let fileName = ExportFiles.toCsv(response);
            responseHelper.sendResponse(
                res,
                HttpStatus.OK,
                req.get('host') + '/exports-files/' + fileName);
        } catch (error) {
            return console.error(error);
        }
    }

    async create(req, res) {
        try {
            let news = req.body;
            let successMessage: string = 'Noticia cadastrada com sucesso!'

            await NewsService.create(news);
            ResponseHelper.sendResponse(res, HttpStatus.OK, `${successMessage}`)
        } catch (error) {
            return console.error(error);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            let news = req.body;
            let successMessage: string = 'Noticia foi atualizado com sucesso'

            await NewsService.update(id, news);
            ResponseHelper.sendResponse(res, HttpStatus.OK, `${successMessage}`
            );
        } catch (error) {
            return console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await NewsService.delete(id);

            ResponseHelper.sendResponse(res, HttpStatus.OK, 'Noticia deletada com sucesso!'
            );
        } catch (error) {

            return console.error(error);
        }
    }
}

export default new NewsController(); 