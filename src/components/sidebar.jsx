import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Use Link for React Router navigation
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation(); // Get the current route
  const menuItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Image Generation (Flux)', route: '/image-generation' },
    { name: 'Voice Synthesis (Eleven Labs)', route: '/voice-synthesis' },
    { name: 'AI Animations and Effects (DupDup)', route: '/ai-animations' },
    { name: 'Settings', route: '/settings' },
  ];

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Unified AI Toolbox</h1>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${location.pathname === item.route ? 'active' : ''}`}
          >
            <Link to={item.route}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
