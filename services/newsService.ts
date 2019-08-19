import NewsRepository from '../repository/newsRepository';

class NewsService {

    async search(term, page, itemsByPage) {
        let result = await NewsRepository.find({ 'title': new RegExp('.*' + term + '*.', 'i') })
            .skip((page - 1) * itemsByPage)
            .limit(itemsByPage);
        return result
    }

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

    async delete(id) {
        let result = await NewsRepository.findByIdAndRemove(id);
        return result;
    }
}

export default new NewsService();