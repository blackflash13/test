import React from "react";
import Transactions from "./Components/Transactions/TransactionsTable";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
    return (
        <div>
            <Header/>
            <Transactions/>
            <Footer/>
        </div>
    );
}

export default App;
