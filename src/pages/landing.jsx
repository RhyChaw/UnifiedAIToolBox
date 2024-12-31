import React, { useEffect } from 'react';
import { auth } from '../auth/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import '../styles/landing.css';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      alert(`Welcome, ${user.displayName}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="landing-container">
      <div className="logo-section">
        <h1>Unified AI Toolbox</h1>
        <p>All Your Creativity Tools in One Place</p>
      </div>
      <div className="login-section">
        <h2>Login</h2>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Landing;
