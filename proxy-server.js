import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/shazam', async (req, res) => {
  const country_code = 'IN'; 
  try {
    const response = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/country', {
      params: { country_code },
      headers: {
        'X-RapidAPI-Key': '7f313de684msh5da7653176c119cp11fcf5jsn3870d4f6e720',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch data from ShazamCore' });
  }
});

// New endpoint for song details
app.get('/api/tracks/details', async (req, res) => {
  const { track_id } = req.query;
  if (!track_id) {
    return res.status(400).json({ error: 'track_id query parameter is required' });
  }
  try {
    const response = await axios.get('https://shazam-core.p.rapidapi.com/v1/tracks/details', {
      params: { track_id },
      headers: {
        'X-RapidAPI-Key': '7f313de684msh5da7653176c119cp11fcf5jsn3870d4f6e720',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch song details from ShazamCore' });
  }
});

// New endpoint for related songs
app.get('/api/tracks/related', async (req, res) => {
  const { track_id } = req.query;
  if (!track_id) {
    return res.status(400).json({ error: 'track_id query parameter is required' });
  }
  try {
    const response = await axios.get('https://shazam-core.p.rapidapi.com/v1/tracks/related', {
      params: { track_id },
      headers: {
        'X-RapidAPI-Key': '7f313de684msh5da7653176c119cp11fcf5jsn3870d4f6e720',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch related songs from ShazamCore' });
  }
});

app.listen(5001, () => console.log('Proxy server running on port 5001')); 