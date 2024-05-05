const transactionLogsRepository = require('./transaction-logs-repository');

async function getTransactionLogss(
  pageNumber = 1,
  pageSize = 10,
  email = '',
  search = '',
  sort = ''
) {
  // return await transactionLogsRepository.getTransactionLogss();
  let transaction_logs =
    await transactionLogsRepository.getTransactionLogss(email);

  // Apply search filter
  if (search) {
    const [searchField, searchValue] = search.split(':');
    transaction_logs = transaction_logs.filter((x) =>
      x[searchField].includes(searchValue)
    );
  }

  // Apply sorting
  if (sort) {
    const [sortField, sortOrder] = sort.split(':');
    transaction_logs.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField].localeCompare(b[sortField]);
      } else if (sortOrder === 'desc') {
        return b[sortField].localeCompare(a[sortField]);
      }
      return 0;
    });
  }

  const totalCount = transaction_logs.length;
  const totalPages = Math.ceil(totalCount / parseFloat(pageSize));
  const startIndex = (parseFloat(pageNumber) - 1) * parseFloat(pageSize);
  const endIndex = parseFloat(startIndex) + parseFloat(pageSize);
  const data = transaction_logs.slice(startIndex, endIndex);

  return {
    page_number: pageNumber,
    page_size: pageSize,
    count: data.length,
    total_pages: totalPages,
    has_previous_page: pageNumber > 1,
    has_next_page: pageNumber < totalPages,
    data: data,
  };
}

async function getTransactionLogs(id) {
  return await transactionLogsRepository.getTransactionLogs(id);
}

async function createTransactionLogs(data) {
  return await transactionLogsRepository.createTransactionLogs(data);
}

async function updateTransactionLogs(id, data) {
  return await transactionLogsRepository.updateTransactionLogs(id, data);
}

async function deleteTransactionLogs(id) {
  return await transactionLogsRepository.deleteTransactionLogs(id);
}

module.exports = {
  getTransactionLogss,
  getTransactionLogs,
  createTransactionLogs,
  updateTransactionLogs,
  deleteTransactionLogs,
};
