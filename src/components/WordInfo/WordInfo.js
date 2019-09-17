import React, { useState, useEffect } from "react";
import uniqueId from 'uniqid';

import APIRequests from '../../utils/APIUtils';
import './WordInfo.scss';

//pass the language through the params. alter the route in APP!!! 

function WordInfo({ word, language }) {

  const [details, setDetails] = useState();
  const [isFetching, setFetch] = useState(false);

  const renderDetails = 
    isFetching 
    ? <div>Loading</div>
    : details && details.map((detail) => (
      <li key={uniqueId.time()}>{detail}</li>
    ));

  const fetchDetails = async () => {
    await APIRequests.wordInformation(word, language)
      .then(data => setDetails(data))
      .then(() => setFetch(false))
      .catch(error => console.log('Error:', error));
  }

  console.log(details);

  useEffect(() => {
    setFetch(true);
    fetchDetails(); 
  }, []);
  
  return (
    <div>
      <h1 className='app-title'>Lexicon</h1>
      <h3 className ='app-title'>It's easy to use</h3>
      <div className='details-container'>
        <h3>Selected word: {word}</h3>
        <div className='inner-container'>
          <div className='labels'>
            <div>Frequency:</div>
            <div>Rank:</div>
          </div>
          <div className='details'>
            {renderDetails}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordInfo;