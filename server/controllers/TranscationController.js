const TransationService = require("../services/transactions");
const ApiError = require("../exceptions/api-error");

class TranscationController {
    async GetTransactions(req, res, next) {
        try {
            const {page, limit, type, value} = req.query;

            if (page < 1 || limit < 1) return next(ApiError.BadRequest("Page and limit value must be greater than 1"));

            if (type && !value || !type && value) return next(ApiError.BadRequest("Filter must have type and value"));

            const users = await TransationService.getTransactions(page, limit, type, value);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new TranscationController();