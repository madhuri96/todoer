import './pagination.css';

const Pagination = ({
  currentPage,
  todosPerPage,
  totalTodos,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handlePerPageSelect = (event) => {
    onPerPageChange(event);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='pagination'>
      <span>Records per page:</span>
      <select
        value={todosPerPage}
        onChange={handlePerPageSelect}
        className='pagination-select'
      >
        <option value='3'>3</option>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
      </select>
      <button
        className='pagination-button'
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        ◀
      </button>
      {/* <span className='pagination-info'>
        Page {currentPage} of {totalPages}
      </span> */}
      <ul className='pagination-list'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <li
              key={number}
              className={`pagination-item ${
                number === currentPage ? 'active' : ''
              }`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </li>
          )
        )}
      </ul>
      <button
        className='pagination-button'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
