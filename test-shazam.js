import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
  params: { country_code: 'IN' },
  headers: {
    'X-RapidAPI-Key': '1cbcbefd6emsh64d6bc1e1741ff5p1ee6b3jsn7a098d5758e6',
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    console.log('SUCCESS! Data:', response.data);
  })
  .catch(error => {
    console.error('ERROR:', error.response?.data || error.message);
  }); 