import React, {useState} from 'react';

const SearchFilters = ({onSearch}) => {
    const [searchType, setSearchType] = useState('txHash');
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        if (searchValue.trim() === '') {
            setErrorMessage('Please enter a search value');
            return;
        }

        onSearch(searchType, searchValue);
        setErrorMessage('');
    };


    return (
        <div>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            <label htmlFor="search-type">Search by:</label>
            <select id="search-type" value={searchType} onChange={handleSearchTypeChange}>
                <option value="txHash">Transaction ID</option>
                <option value="from">Sender address</option>
                <option value="to">Recipient's address</option>
                <option value="blockNumber">Block number</option>
            </select>
            <input
                type="text"
                id="search-value"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchValueChange}
            />
            <button onClick={handleSearch}>Press to search</button>
        </div>
    );
};

export default SearchFilters;
