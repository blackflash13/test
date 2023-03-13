import React from 'react';
import moment from 'moment';

const TransactionsTable = ({ data }) => {
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
        {data.map(tx => (
          <tr key={tx._id}>
            <td>{tx.blockNumber}</td>
            <td className="text-truncate">
              <a href={`https://etherscan.io/tx/${tx.txHash}`}>{tx.txHash}</a>
            </td>
            <td className="text-truncate">{tx.from}</td>
            <td className="text-truncate">{tx.to}</td>
            <td>{tx.confirmations}</td>
            <td>{moment(tx.time).format('MMM-DD-YYYY')}</td>
            <td className="text-truncate">{tx.value}</td>
            <td className="text-truncate">{tx.fee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
