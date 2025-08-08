import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PASSWORD = "atpancrazi99"; // Change this to your password

export default function LoginGate() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setError('');
      localStorage.setItem('authenticated', 'true');
      navigate('/'); // Redirect to home page after login
    } else {
      setError('Incorrect password, try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 8, marginBottom: 12 }}
            autoFocus
          />
        </label>
        <button type="submit" style={{ padding: '8px 16px' }}>Enter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
