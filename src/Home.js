import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>What would you like to generate?</h1>
      <ul>
        <li><Link to="/listing-agreement">📄 Listing Agreement</Link></li>
        {/* Add more as you grow */}
      </ul>

      <button onClick={logout} style={{ marginTop: 30 }}>
        Logout
      </button>
    </div>
  );
}