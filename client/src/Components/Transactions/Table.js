import React from 'react';
import moment from 'moment'

const TransactionsTable = ({data}) => {
    return (
        <table className="table table-responsive is-bordered is-striped m-0">
            <thead className="custom_thead">
            <tr>
                <th>Block number</th>
                <th>Transaction ID</th>
                <th>Sender address</th>
                <th>Recipient's address</th>
                <th>Block confiramtions</th>
                <th>Date</th>
                <th>Value</th>
                <th>Transaction Fee</th>
            </tr>
            </thead>
            <tbody>
            {data.map((tx) => (
                <tr key={tx._id}>
                    <td>{tx.blockNumber}</td>
                    <td><a
                        href={`https://etherscan.io/tx/${tx.txHash}`}>{tx.txHash.substring(0, 13) + '...'}</a>
                    </td>
                    <td>{tx.from.substring(0, 13) + '...'}</td>
                    <td>{tx.to.substring(0, 13) + '...'}</td>
                    <td>{tx.confirmations}</td>
                    <td>{moment(tx.time).format("MMM-DD-YYYY")}</td>
                    <td>{tx.value}</td>
                    <td>{tx.fee}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable;
