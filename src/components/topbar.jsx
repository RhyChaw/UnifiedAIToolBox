import React, { useEffect, useState } from 'react';
import '../styles/topbar.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase authentication
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

function Topbar() {
  const [userName, setUserName] = useState(''); // State to store user name
  const [profilePic, setProfilePic] = useState('/profile-placeholder.png'); // Default profile picture
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase auth

    // Check for user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Update user info if logged in
        setUserName(user.displayName || 'User'); // Fallback to "User" if displayName is not set
        setProfilePic(user.photoURL || '/profile-placeholder.png'); // Use placeholder if photoURL is not set
      } else {
        // Reset to defaults if no user is logged in
        setUserName('');
        setProfilePic('/profile-placeholder.png');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirect to home on logout
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        alert('Failed to log out. Please try again.');
      });
  };

  const handleSettings = () => {
    navigate('/settings');
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('.user-info')) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener for detecting clicks outside the dropdown
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="user-info" onClick={toggleDropdown}>
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <p className="user-name">{userName ? userName : 'Guest'}</p>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="logout-button" onClick={handleSettings}>
              Settings
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
