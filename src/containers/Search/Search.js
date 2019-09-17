import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';

function Search (props) {

  function search(query) {
    console.log(query);
  }
  
  return (
    <div>
      <SearchBar onSearch={search} />
    </div>
  )
}

export default Search;