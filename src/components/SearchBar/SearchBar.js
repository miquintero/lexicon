import React, { useState, useEffect } from "react"

import APIRequests from '../../utils/APIUtils';
import usePrevious from '../../utils/compareHook';
import WordList from '../WordList/WordList'; 

function SearchBar ({ onSearch }) {

  const [searchValue, setValue] =  useState('');
  const [inputWord, setInput] = useState('')
  const [words, setWords] = useState();
  const [languages, setLanguages] = useState();

  const fetchWords = async () => {
    const fetchedWords = await APIRequests
      .semanticallySimilarWords(inputWord);
    setWords(fetchedWords);
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if(onSearch) onSearch(searchValue);
    fetchWords();
    setInput(searchValue);
    setValue('');
  }
  
  const prevInput = usePrevious(searchValue);

  useEffect(() => {
    async function fetchLanguages () {
      const fetchedLanguages = await APIRequests
        .allLanguages();
      setLanguages(fetchedLanguages);
    }
    fetchLanguages();
    if (prevInput !== inputWord) fetchWords(inputWord);
  }, []);
  
  return(
    <div className="App">
      <h1>Lexi's Lexicon</h1>
      <h2>Your search: {inputWord}</h2>
      <section>
        <form>
          <input
            type='text'
            className='search'
            placeholder='What is your favorite word?'
            value={searchValue}
            onChange={handleChange}
          ></input>
          <input
            type='submit'
            value='Search'
            onClick={handleSubmit}
          ></input>
        </form>
      </section>
      <WordList words={words}></WordList>
    </div>
  );
}

export default SearchBar;