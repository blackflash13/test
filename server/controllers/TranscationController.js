const TransactionService = require('../services/transactions');
const ApiError = require('../exceptions/api-error');

class TransactionController {
  async GetTransactions(req, res, next) {
    try {
      const { page, limit, type, value } = req.query;
      if (page < 1 || limit < 1)
        return next(
          ApiError.BadRequest('Page and limit value must be greater than 1')
        );

      const transactions = await TransactionService.getTransactions(
        page,
        limit,
        type,
        value
      );
      return res.json(transactions);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransactionController();
