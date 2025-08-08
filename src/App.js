import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ListingAgreementForm from './ListingAgreementForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing-agreement" element={<ListingAgreementForm />} />
      </Routes>
    </Router>
  );
}

export default App;