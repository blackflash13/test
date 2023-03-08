const TransationService = require("../services/transactions");
const ApiError = require("../exceptions/api-error");

class TranscationController {
    async GetTransactions(req, res, next) {
        try {
            const {page, perpage, type, value} = req.query;

            if (page < 1 || perpage < 1) return next(ApiError.BadRequest("Page and perpage value must be greater than 1", errors.array()));

            if (!type || !value) return next(ApiError.BadRequest("Filter must have type and value"));

            const users = await TransationService.getTransactions(page, perpage, type, value);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new TranscationController();