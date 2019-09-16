import React, { useState, useEffect } from "react";
import uniqueId from 'uniqid';

import APIRequests from '../../utils/APIUtils';

function WordInfo() {

  const [details, setDetails] = useState();

  useEffect(() => {
    async function fetchDetails () {
      const fetchedDetails = await APIRequests
        .wordInformation();
      setDetails(fetchedDetails);
    }
    fetchDetails(); 
  }, []);

  console.log(details);

  const renderDetails = details && details.map((detail) => (
    <li key={uniqueId.time()}>{detail}</li>
  ));
  
  return (
    <div>
      <ul>
        {renderDetails}
        {/* Frequency:{renderDetails[0]}
        Rank:{renderDetails[1]} */}
      </ul>
    </div>
  );
}

export default WordInfo;