const Router = require('express')
const router = new Router()

const tx = require("./transactions");

router.use("/tx", tx);


module.exports = router