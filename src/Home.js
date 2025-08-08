import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>What would you like to generate?</h1>
      <ul>
        <li><Link to="/listing-agreement">📄 Listing Agreement</Link></li>
        {/* Add more as you grow */}
      </ul>
    </div>
  );
}