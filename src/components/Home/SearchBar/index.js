import React from 'react';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ value, changeInput }) => (
  <div className='searchBar-wrap'>
    <input
      type='text'
      placeholder='   Search for amazing products....'
      value={value}
      onChange={changeInput}
    />
    <SearchIcon className='searchBar-icon' />

  </div>
);

export default SearchBar;