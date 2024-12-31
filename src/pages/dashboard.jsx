import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import '../styles/dashboard.css';

function Dashboard() {
  const dashboardOptions = [
    { name: 'Image Generation (Flux)', description: 'Create stunning images with AI.', route: '/image-generation', status: '1' },
    { name: 'Voice Synthesis (Eleven Labs)', description: 'Generate realistic voices.', route: '/voice-synthesis', status: '1' },
    { name: 'AI Animations and Effects (DupDup)', description: 'Add animations and effects.', route: '/ai-animations', status: '1' },
    { name: 'Video editing and creation (RUNWAY ML)', description: 'Not available yet', route: '/', status: '0' },
    { name: 'Text-to-Video or Image-to-Video Conversion (SORA AI API)', description: 'Not available yet', route: '/', status: '0' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-boxes">
          {dashboardOptions.map((option, index) => (
            <a
              key={index}
              href={option.status === '1' ? option.route : '#'}
              className={`box ${option.status === '0' ? 'disabled' : 'available'}`}
              style={{ pointerEvents: option.status === '0' ? 'none' : 'auto' }}
            >
              <h3 className="box-title">{option.name}</h3>
              <p className="box-description">{option.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
