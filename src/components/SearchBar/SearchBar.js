import React, { useState, useEffect } from "react"
import uniqueId from 'uniqid';

import APIRequests from '../../utils/APIUtils';
import usePrevious from '../../utils/compareHook';
import WordList from '../WordList/WordList'; 
import './SearchBar.scss';

function SearchBar ({ onSearch }) {

  const [searchValue, setValue] =  useState('');
  const [inputWord, setInput] = useState('')
  const [words, setWords] = useState();
  const [languages, setLanguages] = useState();
  const [selectedLanguage, setSelect] = useState();
  const [hasSearched, setSearch] = useState(false);
  const [isFetching, setFetch] = useState(false);
  const [showDropdown, setDropdown] = useState(false);

  const renderLanguages = languages && languages.map((language) => (
    <div key={uniqueId.time()}>
      <li value={language} onClick={() => { selectLanguage(language) }}>
        {language}
      </li>
    </div>
  ));

  const renderSelectedLanguages = (
    selectedLanguage ? <div>{selectedLanguage}</div> : <div className='dropdown-title'>Languages</div>
  )

  const fetchLanguages = async () => {
    await APIRequests.allLanguages()
      .then(data => setLanguages(data))
      .catch(error => console.log('Error:', error));
  }

  const selectLanguage = (language) => {
    setSelect(language);
    setDropdown(false);
  }

  const displayDropdown = (event) => {
    event.preventDefault();
    showDropdown ? setDropdown(false) : setDropdown(true);
  }

  const fetchWords = async () => {
    await APIRequests.semanticallySimilarWords(searchValue, selectedLanguage)
      .then(data => setWords(data))
      .then(() => setFetch(false))
      .catch(error => console.log('Error:', error));
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if(onSearch) onSearch(searchValue);
    fetchWords();
    setInput(searchValue);
    setSearch(true);
    setFetch(true);
    setValue('');
  }
  
  const prevSearch = usePrevious(searchValue);
  const prevLanguage = usePrevious(selectedLanguage);

  useEffect(() => {
    fetchLanguages();
    prevSearch !== inputWord 
    && prevLanguage !== selectedLanguage
    ? fetchWords(inputWord, selectedLanguage)
    : null;   
  }, []);
  
  return(
    <div className='App'>
      <h1 className='app-title'>Lexicon</h1>
      <h3 className ='app-title'>It's easy to use</h3>
      <h3 className ='app-title'>Pick a language | Type a word | Click Search</h3>
      <div className='searchBar'>
        <div className='dropdown' 
          onClick={displayDropdown}
        >{renderSelectedLanguages}
        </div>
        { showDropdown 
          ? (<div className='language-list'>
              <div className='list-item'
                value={selectedLanguage}
              >
                {renderLanguages}
              </div>
            </div>)
          : (null)
        }
        <input className='search'
          type='text'
          placeholder='What is your favorite word?'
          value={searchValue}
          onChange={handleChange}
        ></input>
        <input className='button'
          type='submit'
          value='Search'
          onClick={handleSubmit}
        >
        </input>
      </div>
      <h2>{inputWord}</h2>
      <div className ='alert'>
        { !hasSearched
        ? <div className='alert-text'>Don't forget to type a word</div>
        : isFetching 
        ? <div className='alert-text'>Loading</div>
        : words.length === 0
        ? <div className='alert-text'>No semantically similar words found</div> 
        : <WordList words={words} language={selectedLanguage}></WordList>
        }
      </div>
    </div>
  );
}

export default SearchBar;