import NewsRepository from '../repository/newsRepository';

class NewsService {

    async get() {
        let result = await NewsRepository.find({});
        return result;
    }

    async getById(id) {
        let result = await NewsRepository.findById(id);
        return result;
    }

    async create(news) {
        let result = await NewsRepository.create(news);
        return result;
    }

    async update(id, news) {
        let result = await NewsRepository.findByIdAndUpdate(id, news);
        return result;
    }

    async delete(_id) {
        let result = await NewsRepository.findByIdAndRemove(_id);
        return result;
    }
}

export default new NewsService();