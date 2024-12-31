import React from 'react';
import '../styles/sidebar.css';

function Sidebar() {
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
          <li key={index} className="menu-item">
            <a href={item.route}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
