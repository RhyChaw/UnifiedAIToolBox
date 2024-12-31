import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import '../styles/dashboard.css';

function settings() {
  const [input, setInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const apiKey = import.meta.env.VITE_BFL_API_KEY;
  
      const createResponse = await fetch('https://api.bfl.ml/v1/flux-pro-1.1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-key': apiKey,
        },
        body: JSON.stringify({
          prompt: input,
          width: 1024,
          height: 768,
        }),
      });
  
      const createData = await createResponse.json();
  
      if (!createResponse.ok) {
        throw new Error(createData.message || 'Failed to create image generation request.');
      }
  
      const requestId = createData.id;
  
      let result = null;
  
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 500));
  
        const pollResponse = await fetch(`https://api.bfl.ml/v1/get_result?id=${requestId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-key': apiKey,
          },
        });
  
        const pollData = await pollResponse.json();
  
        if (pollData.status === 'Ready') {
          result = pollData.result.sample;
          break;
        } else if (pollData.status === 'Failed') {
          throw new Error('Image generation failed.');
        }
      }
  
      setGeneratedImage(result);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An unexpected error occurred.');
      setGeneratedImage(null);
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
          <h2 className="content-title">User Settings</h2>
          <p>Select a theme? </p>
          <p>Select other features </p>
          <p>See api credits, etc.  </p>
        </div>
      </div>
    </div>
  );
}

export default settings;
