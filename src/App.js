import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginGate from './LoginGate';
import Home from './Home';

// Simple auth check using localStorage
const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};

// A wrapper for protected routes
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginGate />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Optionally add more protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
