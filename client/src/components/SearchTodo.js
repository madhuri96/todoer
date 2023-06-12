import React, { useState } from 'react';
import './searchTodo.css';

const SearchTodo = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  };

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search Todos...'
        className='search-input'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
};

export default SearchTodo;
