import './App.scss';
import Search from "./Components/Search/Search";
import axios from 'axios';
import React, {useState} from "react";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

function App() {


    return (
        <div>
            <h1>My App</h1>
            {<TransactionsTable />}
        </div>
    );
}

export default App;
