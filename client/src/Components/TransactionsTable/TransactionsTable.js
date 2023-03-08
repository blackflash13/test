import React, {useState, useEffect} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ApiService from "../api/index";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [pages, setPages] = useState(1);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [searchType, setSearchType] = useState('txHash');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async (searchType, query) => {
        await ApiService.sendRequestToAPI(page, limit, searchType, query).then((response) => {
            setUsers(response.data.result);
            setPage(response.data.page);
            setPages(response.data.totalPage);
            setRows(response.data.totalRows);
            setMsg("");
        }).catch((e) => {
            console.log(e.response.data.message)
            setMsg(e.response.data.message)
            setUsers([]);
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
        await getUsers(searchType, query);
    };


    return (
        <div className="container mt-5">

            <div className="columns">
                <div className="column is-centered">
                    <select id="search-type" value={searchType} onChange={handleSearchTypeChange}>
                        <option value="txHash">Transaction ID</option>
                        <option value="from">Sender address</option>
                        <option value="to">Recipient's address</option>
                        <option value="blockNumber">Block number</option>
                    </select>

                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                type="text"
                                className="input"
                                value={query}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setQuery(e.target.value)
                                }}
                                placeholder="Find something here..."
                            />
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-info" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>

                    {msg ? <p className="has-text-centered has-text-danger">{msg}</p> : <div>
                        <table className="table is-striped is-bordered is-fullwidth mt-2">
                            <thead>
                            <tr>
                                <th>Block number</th>
                                <th>Transaction ID</th>
                                {/*<th>Name</th>*/}
                                {/*<th>Email</th>*/}
                                {/*<th>Gender</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.blockNumber}</td>
                                    <td>{user.txHash}</td>
                                    {/*<td>{user.email}</td>*/}
                                    {/*<td>{user.gender}</td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <p>
                            Total Rows: {rows} Page: {rows ? page : 1} of {pages}
                        </p>
                        <nav
                            className="pagination is-centered"
                            key={rows}
                            role="navigation"
                            aria-label="pagination"
                        >
                            <ReactPaginate
                                previousLabel={"< Prev"}
                                nextLabel={"Next >"}
                                pageCount={Math.min(pages)}
                                onPageChange={changePage}
                                containerClassName={"pagination-list"}
                                pageLinkClassName={"pagination-link"}
                                previousLinkClassName={"pagination-previous"}
                                nextLinkClassName={"pagination-next"}
                                activeLinkClassName={"pagination-link is-current"}
                                disabledLinkClassName={"pagination-link is-disabled"}
                            />
                        </nav>
                    </div>}


                </div>
            </div>
        </div>
    );
};

export default UserList;