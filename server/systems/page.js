class Page {
  calculatePagesCount = (pageSize, totalCount) => {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  };
}

module.exports = new Page();