import React from "react";
import uniqueId from 'uniqid';

function WordList({ words }) {

  const renderWords = words && words.map((word) => (
    <li key={uniqueId.time()}>{word}</li>
  ));
  
  return (
    <div>
      <ul>{renderWords}</ul>
    </div>
  );
}

export default WordList;