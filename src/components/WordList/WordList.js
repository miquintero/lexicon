import React from "react";
import { Link, withRouter } from 'react-router-dom';
import uniqueId from 'uniqid';

function WordList({ words, language }) {

  const renderWords = words && words.map((word) => (
      <div key={uniqueId.time()}>
        <Link 
          style={{ textDecoration: 'none', color:'#555' }}
          to={{ pathname: `/lexicon/${language}/${word}` }}
        >
          {word}
        </Link>
      </div>
  ));
  
  return (
      <div>
        <ul>{renderWords}</ul>
      </div>
  );
}

export default withRouter(WordList);