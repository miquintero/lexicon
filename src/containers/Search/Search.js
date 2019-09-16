import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import WordInfo from '../../components/WordInfo/WordInfo';

function Search (props) {

  function search(query) {
    console.log(query);
  }
  
  return (
    <div>
      <SearchBar onSearch={search} />
      <WordInfo />
    </div>
  )
}

export default Search;