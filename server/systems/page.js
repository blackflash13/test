class Page {
    calculatePagesCount = (pageSize, totalCount) => {
        return totalCount < pageSize ? 0 : Math.ceil(totalCount / pageSize);
    };
}

module.exports = new Page();