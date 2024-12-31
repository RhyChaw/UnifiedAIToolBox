import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard'; // Create this component
import ImageGen from './pages/dashboard/imagegen';
import Settings from './pages/settings';
import VoiceGen from './pages/dashboard/voicesyn';
import DupDup from './pages/dashboard/dupdup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/image-generation" element={<ImageGen />} />
        <Route path="/voice-synthesis" element={<VoiceGen />} />
        <Route path="/ai-animations" element={< DupDup/>} />
      </Routes>
    </Router>
  );
}

export default App;
