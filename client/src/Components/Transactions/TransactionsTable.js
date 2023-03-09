import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import ApiService from "../../api/index";
import TransactionsTable from "./Table";
import LeftArrow from "./PaginationArrow/LeftArrow";
import RightArrow from "./PaginationArrow/RightArrow";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [pages, setPages] = useState(1);
    const [rows, setRows] = useState(0);
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [searchType, setSearchType] = useState('txHash');

    useEffect(() => {
        getTransactions();
    }, [page]);

    const getTransactions = (searchType, query) => {
        ApiService.sendRequestToAPI(page, limit, searchType, query).then((response) => {
            setTransactions(response.data.result);
            setPage(response.data.page);
            setPages(response.data.totalPage);
            setRows(response.data.totalRows);
            setMsg("");
        }).catch((e) => {
            console.log(e.response.data.message)
            setMsg(e.response.data.message)
            setTransactions([]);
        });
    };

    const changePage = ({selected}) => {
        setPage(selected + 1);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        console.log(searchType)
    };

    const handleSearch = async () => {
        if (query == "") {
            //підсвітку поля вводу!
            return;
        }
        await getTransactions(searchType, query);
    };

    return (
        <main className="container " id="main">
            <div className="columns is-variable is-mobile">
                <div className="column is-5-widescreen is-8-tablet is-12-mobile">
                    <div className="columns is-gapless is-mobile is-align-items-center">
                        <div className="column is-11-widescreen is-9-tablet is-9-mobile">
                            <div className="columns is-gapless search_elements is-mobile">
                                <div className="column is-6-widescreen is-5-mobile">
                                    <input
                                        type="text"
                                        className="input custom_input"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value)
                                        }}
                                        placeholder="Search..."
                                    />
                                </div>

                                <div className="select column is-6-widescreen is-5-mobile">
                                    <select className=" custom_select" id="search-type" value={searchType}
                                            onChange={handleSearchTypeChange}>
                                        <option value="txHash">Transaction ID</option>
                                        <option value="from">Sender address</option>
                                        <option value="to">Recipient's address</option>
                                        <option value="blockNumber">Block number</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="column is-1-mobile is-1-widescreen is-1-table ml-3">
                            <button type="submit" className="button is-info" onClick={handleSearch}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M0 6.92313C0 3.10631 3.10351 0 6.92451 0C10.7418 0 13.849 3.1026 13.849 6.92313C13.849 8.42815 13.3664 9.8228 12.5483 10.9597L15.6726 14.0833C16.1076 14.5183 16.1091 15.2281 15.6771 15.6649C15.4538 15.894 15.1591 16 14.8795 16C14.5864 16 14.2988 15.8817 14.0865 15.6695L10.962 12.5457C9.82484 13.3637 8.42986 13.8463 6.92451 13.8463C3.10698 13.8463 0 10.7402 0 6.92313ZM6.92127 2.2472C4.344 2.2472 2.24415 4.3441 2.24415 6.92313C2.24415 9.5027 4.34454 11.6023 6.92127 11.6023C9.5007 11.6023 11.5984 9.49999 11.5984 6.92313C11.5984 4.34681 9.50124 2.2472 6.92127 2.2472Z"
                                          fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {msg ? <p className="has-text-centered has-text-danger">{msg}</p> :
                <div>
                    <div className="table-responsive">
                        {transactions.length > 0 ? (<TransactionsTable data={transactions}/>) : (
                            <p>Loading data...</p>)}</div>

                    <div className="mt-6">

                        {/*<p> Total Rows: {rows} Page: {rows ? page : 1} of {pages}</p>*/}

                        <nav
                            className="pagination is-centered"
                            key={rows}
                            role="navigation"
                            aria-label="pagination"
                        ><ReactPaginate
                            previousLabel={<LeftArrow/>}
                            nextLabel={<RightArrow/>}
                            onPageChange={changePage}
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousLinkClassName={"pagination-previous"}
                            nextLinkClassName={"pagination-next"}
                            activeLinkClassName={"pagination-link is-current"}
                            disabledLinkClassName={"pagination-link is-disabled"}
                            breakLabel="..."
                            pageCount={Math.min(pages)}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={5}
                        />
                        </nav>
                    </div>
                </div>
            }
        </main>
    );
};

export default Transactions;