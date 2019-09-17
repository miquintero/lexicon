import axios from 'axios';
// import handleErrors from './handleErrors';

const url = process.env.API_URL;
const key = process.env.API_KEY;

const extraFields = process.env.ADDITIONAL_FIELDS;
const polarization = process.env.POLARIZATION;

const APIRequests = {

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
  
  allLanguages () {
    return axios.get(
      `${url}/languages?apiKey=${key}`,
      this.getHeaders()
    )
    .then(response => {
      const languages = response.data;
      return languages;
    })
    .catch(error => console.log(error))
  },

  semanticallySimilarWords (word, language) {
    return axios.get(
      `${url}/lexicon/${language}/${word}?additionalFields=${extraFields}&apiKey=${key}&polarizeWord=${polarization}`,
      this.getHeaders()
    )
    .then(response => {
      const fetchedWords = response.data.semanticallySimilarWords
        .map(wordDetails => wordDetails.word);
      return fetchedWords;
    })
    .catch(error => console.log(error))
  },

  wordInformation (word, language) {
    return axios.get(
      `${url}/lexicon/${language}/${word}/info?apiKey=${key}`,
      this.getHeaders()
    )
    .then(response => {
      const details = [response.data.frequency, response.data.absoluteRank];
      return details;
    })
    .catch(error => console.log(error))
  }
}

export default APIRequests;