import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Topbar from '../../components/topbar';
import '../../styles/dashboard.css';

function DupDup() {
  const [file, setFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Invalid file type! Please upload a JPEG, PNG image, or MP4 video.');
      return;
    }

    setFile(selectedFile);
    setOutputUrl(null);
  };

  const handleApplyEffect = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://app.dupdub.com/api/v1/effects/apply', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_DUPDUB_API_KEY}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setOutputUrl(data.outputUrl);
      } else {
        console.error('API Error:', data.message || 'Failed to apply effect.');
        alert(data.message || 'An error occurred while processing the file.');
      }
    } catch (error) {
      console.error('Request Error:', error);
      alert('An unexpected error occurred. Please try again.');
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
          <h2 className="content-title">AI Animations and Effects (DupDub)</h2>
          <p>Upload an image or video file to apply AI animations and effects:</p>
          <div className="input-area">
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,video/mp4"
            />
            <button
              className="generate-button"
              onClick={handleApplyEffect}
              disabled={loading || !file}
            >
              {loading ? 'Applying...' : 'Apply Effect'}
            </button>
          </div>
          {outputUrl && (
            <div className="output-preview">
              <h3>Processed File:</h3>
              {outputUrl.endsWith('.mp4') ? (
                <video controls>
                  <source src={outputUrl} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              ) : (
                <img src={outputUrl} alt="Processed Output" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DupDup;
