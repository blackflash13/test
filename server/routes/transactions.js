const Router = require("express").Router;
const router = new Router();
const TransactionController = require("../controllers/TranscationController");


router.get("/",  TransactionController.GetTransactions);


module.exports = router;
