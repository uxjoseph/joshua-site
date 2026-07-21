import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/ContactFooter';
import { Home } from './pages/Home';
// Newsletter / Article pages temporarily disabled at the router level per 2026-07-14
// direction. Files kept intact for possible reactivation.
// import { Newsletter } from './pages/Newsletter';
// import { Article } from './pages/Article';
import { Education } from './pages/Education';
import { Privacy } from './pages/Privacy';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<Navigate to="/" replace />} />
          <Route path="/newsletter/:slug" element={<Navigate to="/" replace />} />
          <Route path="/education" element={<Education />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <ContactFooter />
      </div>
    </Router>
  );
}

export default App;
