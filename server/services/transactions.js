const TransactionsModel = require('../db/models/transactions');
const Page = require('../systems/page');
const ApiError = require('../exceptions/api-error');

class TransactionsService {
  async getTransactions(page, limit, type, value) {
    page = Math.max(0, page);

    const filter =
      type && value ? { [type]: { $regex: `${value}`, $options: 'ig' } } : {};
    const totalCount = await TransactionsModel.find(filter).count();
    if (!totalCount)
      throw ApiError.NotFound(
        `${type}: ${value} not found! Check filter, value and try again!`
      );

    const pagesCount = Page.calculatePagesCount(limit, totalCount);
    if (pagesCount < page) throw ApiError.PageNumberGreater();

    return {
      result: await TransactionsModel.find(filter)
        .limit(limit)
        .skip((page - 1) * limit),
      page: page,
      limit: limit,
      totalRows: totalCount,
      totalPage: pagesCount,
    };
  }
}

module.exports = new TransactionsService();
