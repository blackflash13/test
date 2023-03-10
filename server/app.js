const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./db/mongoose");
const router = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");
const {getTransactionsFromBlocks} = require("./systems/transactions");

app.use(express.json({limit: "50mb"}));
app.use(cors({
    origin: process.env.HOST,
}));

app.use(express.urlencoded({
    extended: true
}));

app.use("/api", router);
app.use(errorMiddleware);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "../../client/build"));
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
});


connectDb()
    .on("error", (error) => console.log(error.message))
    .on("open", async (_) => {

        if (process.env.NODE_ENV !== 'test') {
            let listener = app.listen(process.env.PORT, () => {
                console.log(`Example app listening at http://localhost:${listener.address().port}`);
            });
        }
        await getTransactionsFromBlocks();
    });

module.exports = app;