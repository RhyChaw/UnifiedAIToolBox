import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8904;

app.use(bodyParser.json());

app.post('/generate-voice', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/:voice_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_ELEVEN_LABS_API_KEY}`,
      },
      body: JSON.stringify({
        text,
        voice: 'en_us_male',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ message: error.message });
    }

    const data = await response.json();
    res.json({ audioUrl: data.audioUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to generate audio.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
