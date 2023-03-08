const TransationService = require("../services/transactions");

class TranscationController {
    async GetTransactions(req, res, next) {
        try {
            const {page, perpage, type, value} = req.query;
            const users = await TransationService.getTransactions(page, perpage, type, value);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new TranscationController();