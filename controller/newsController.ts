import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import ResponseHelper from '../helpers/responseHelper';
import responseHelper from '../helpers/responseHelper';

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
            this.errorMessageParser(error);
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id
            let result = await NewsService.getById(id)
            responseHelper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            this.errorMessageParser(error);
        }
    }

    async create(req, res) {
        try {
            let news = req.body;
            let successMessage: string = 'Noticia cadastrada com sucesso!'

            await NewsService.create(news);
            ResponseHelper.sendResponse(res, HttpStatus.OK, `${successMessage}`)
        } catch (error) {
            this.errorMessageParser(error);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            let news = req.body;

            await NewsService.update(id, news);
            ResponseHelper.sendResponse(res, HttpStatus.OK, 'Noticia foi atualizado com sucesso'
            );
        } catch (error) {
            this.errorMessageParser(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await NewsService.delete(id);

            ResponseHelper.sendResponse(res, HttpStatus.OK, 'Noticia deletada com sucesso!'
            );
        } catch (error) {
            
            this.errorMessageParser(error);
        }
    }

    private errorMessageParser(error: string) {
        return console.error(error);
    }
}

export default new NewsController(); 