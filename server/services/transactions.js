const TransactionsModel = require("../db/models/transactions");
const Page = require("../systems/page");
const ApiError = require("../exceptions/api-error");

class TransactionsService {

    async getTransactions(page, perPage, type, value) {
        page = Math.max(0, page)
        const totalCount = await TransactionsModel.find({[type]: value}).count();
        const pagesCount = Page.calculatePagesCount(perPage, totalCount);

        if (pagesCount < page) throw ApiError.PageNumberGreater()

        let transactions = await TransactionsModel.find({[type]: value}).limit(perPage).skip((page - 1) * perPage);;

        return {
            txs: transactions,
            pagesCount: pagesCount
        }
    }


}

module.exports = new TransactionsService();
