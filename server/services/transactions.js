const TransactionsModel = require("../db/models/transactions");
const Page = require("../systems/page");
const ApiError = require("../exceptions/api-error");

class TransactionsService {

    async getTransactions(page, limit, type, value) {
        page = Math.max(0, page)
        const totalCount = await TransactionsModel.find({[type]: value}).count();
        if (!totalCount) throw ApiError.NotFound(`${type}: ${value} not found! Check filter, value and try again!`)

        const pagesCount = Page.calculatePagesCount(limit, totalCount);
        console.log(pagesCount)
        if (pagesCount < page) throw ApiError.PageNumberGreater()

        let transactions = await TransactionsModel.find({[type]: value}).limit(limit).skip((page - 1) * limit);


        return {
            result: transactions,
            page: page,
            limit: limit,
            totalRows: totalCount,
            totalPage: pagesCount
        }
    }
}

module.exports = new TransactionsService();
