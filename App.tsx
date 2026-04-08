import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/ContactFooter';
import { Home } from './pages/Home';
import { Newsletter } from './pages/Newsletter';
import { Article } from './pages/Article';
import { Education } from './pages/Education';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/:slug" element={<Article />} />
          <Route path="/education" element={<Education />} />
        </Routes>
        <ContactFooter />
      </div>
    </Router>
  );
}

export default App;
