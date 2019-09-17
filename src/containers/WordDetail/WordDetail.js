import React from 'react';

import WordInfo from '../../components/WordInfo/WordInfo';

function WordDetail ({ match }) {

  const {
    params: { language, word }
  } = match;

  return (
    <div>
      <WordInfo language={language} word={word}/>
    </div>
  )
};

export default WordDetail;