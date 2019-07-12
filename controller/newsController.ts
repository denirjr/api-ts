import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';

import ResponseHelper from '../helpers/responseHelper';


class NewsController {

    get(req, res) {
        NewsService.get()
            .then(news => ResponseHelper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getById(req, res) {
        const id = req.params.id

        NewsService.getById(id)
            .then(news => ResponseHelper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    create(req, res) {
        let news = req.body;
        NewsService.create(news)
            .then(() => ResponseHelper.sendResponse(res, HttpStatus.OK, 'Noticia cadastrada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    update(req, res) {
        const id = req.params.id;
        let news = req.body;

        NewsService.update(id, news)
            .then(news => ResponseHelper.sendResponse(res, HttpStatus.OK,  'Noticia foi atualizado com sucesso'))
            .catch(error => console.error.bind(console, `Error ${error}`));

    }

    delete(req, res) {
        const id = req.params.id;

        NewsService.delete(id)
            .then(() => ResponseHelper.sendResponse(res, HttpStatus.OK, 'Noticia deletada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}

export default new NewsController(); 