const TransactionsModel = require("../db/models/transactions");
const Page = require("../systems/page");
const ApiError = require("../exceptions/api-error");

class TransactionsService {

    async getTransactions(page, perPage) {
        // perPage = 20;
        page = Math.max(0, page)

        const totalCount = await TransactionsModel.find().count();
        const pagesCount = Page.calculatePagesCount(perPage, totalCount);
        if (pagesCount < page) throw ApiError.PageNumberGreater()

        const transactions = await TransactionsModel.find().limit(perPage)/*.skip(perPage * page)*/.skip((page - 1) * perPage);

        return {
            txs: transactions,
            pagesCount: pagesCount
        }
    }


}

module.exports = new TransactionsService();
