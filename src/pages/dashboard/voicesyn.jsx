import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Topbar from '../../components/topbar';
import '../../styles/dashboard.css';

function VoiceSynthesis() {
  const [textPrompt, setTextPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('pNInz6obpgDQGcFmaJgB');

  const voices = [
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
    { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
    { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie' },
    { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Dorothy' },
    { id: 'CYW3kZ02Hs0563khs1Fj', name: 'Josh' },
    { id: 'ThT5KcBeYPX3keUQqHPh', name: 'Arnold' },
  ];

  const handleGenerateVoice = async () => {
    if (!textPrompt.trim()) return;

    setLoading(true);
    setAudioUrl(null);

    try {
      const apiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing. Check your environment variables.');
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            text: textPrompt,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate audio.');
      }

      const data = await response.blob();
      const audioUrl = URL.createObjectURL(data);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error:', error.message || error);
      alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <h2 className="content-title">Voice Synthesis (Eleven Labs)</h2>
          <p>Enter text to generate voice:</p>
          <div className="voiceBox">
            <div className="input-area">
              <textarea
                className="input-box"
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="Enter your text..."
              />
            </div>

            <select
              className="voice-dropdown"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>

            <button
              className="generate-button"
              onClick={handleGenerateVoice}
              disabled={loading || !textPrompt.trim()}
            >
              {loading ? 'Generating...' : 'Generate Voice'}
            </button>
          </div>
          {audioUrl && (
            <div className="audio-preview">
              <h3>Generated Voice:</h3>
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceSynthesis;
