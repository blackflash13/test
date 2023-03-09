const {MongoClient} = require("mongodb");
const axios = require("axios");
const TransactionsModel = require("../db/models/transactions");
const fs = require("fs");

const apiUrl = `https://api.etherscan.io/api?module=proxy&boolean=true&apikey=${process.env.etherKEY}&action=eth_getBlockByNumber&tag=`;

class Transactions {
    getTransactionsFromBlocks = async () => {
        try {
            const response = await axios.get(apiUrl + 'latest');
            const latestBlockNumber = parseInt(response.data.result.number, 16);
            const isExist = await TransactionsModel.findOne();
            const blockNumbers = [];

            if (!isExist) {
                console.log("Will initialize 1000 latest block with transactions.")
                for (let i = 0; i <= 1/*1000*/; i++) {
                    const blockNumber = latestBlockNumber - i;
                    if (blockNumber < 0) {
                        break;
                    }
                    blockNumbers.push(blockNumber);
                }
            } else blockNumbers.push(latestBlockNumber)

            for (const blockNumber of blockNumbers) {
                const response = await axios.get(apiUrl + blockNumber.toString(16));
                const block = response.data.result;
                for (const tx of block.transactions) {
                    console.log(tx.hash)
                    const transaction = {
                        txHash: tx.hash,
                        blockNumber: parseInt(tx.blockNumber, 16),
                        from: tx.from,
                        to: tx.to,
                        value: this.fromWeiToEth(parseInt(tx.value, 16), tx.hash),
                        confirmations: latestBlockNumber - parseInt(tx.blockNumber, 16) + 1,
                        fee: this.calculateFee(tx.gasPrice, tx.gas),
                        time: parseInt(block.timestamp, 16) * 1000
                    };
                    await this.saveTx(transaction);

                    const existingTransaction = await TransactionsModel.findOne({txHash: tx.hash});
                    if (existingTransaction && existingTransaction.confirmations !== transaction.confirmations) {
                        await this.updTxConfirmation(existingTransaction.txHash, transaction.confirmations);
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            await this.sleep(10000);
            await this.getTransactionsFromBlocks();
        }
    };

    saveTx = async (transactions) => {
        try {
            await TransactionsModel.create(transactions)
            await this.writeLog(`Transaction with hash ${transactions.txHash} added to the DB.`);
        } catch (err) {
            console.error(err.message);
        }
    };

    updTxConfirmation = async (txHash, confirmations) => {
        try {
            await TransactionsModel.updateOne({txHash}, {$set: {confirmations}});
            console.log(`Updated confirmations for transaction ${txHash} to ${confirmations}.`)
            await this.writeLog(`Updated confirmations for transaction ${txHash} to ${confirmations}.`)
        } catch (err) {
            console.error(err);
        }
    };

    fromWeiToEth(valueInWei, tx) {
        const divider = Math.pow(10, 18);
        const valueInEth = valueInWei / divider;
        return valueInEth;
    }

    calculateFee(gasPrice, gas) {
        return this.fromWeiToEth(gasPrice * gas);
    }

    sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    writeLog = async (mssg) => {
        const time = new Date();
        const timeInStr = `--- ${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}\n\n`
        fs.appendFile("logs/tx.log", mssg + timeInStr, function (err) {
            if (err) return console.log(err);
        });
    }
}

module.exports = new Transactions();