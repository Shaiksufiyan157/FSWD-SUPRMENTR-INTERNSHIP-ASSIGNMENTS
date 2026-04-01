import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing your custom components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      {/* The Navbar is outside <Routes> so it stays visible on every page */}
      <Navbar />

      {/* The Routes container manages which page is displayed based on the URL */}
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          {/* path="/" is your default home page */}
          <Route path="/" element={<Home />} />
          
          {/* path="/about" matches http://localhost:3000/about */}
          <Route path="/about" element={<About />} />
          
          {/* path="/contact" matches http://localhost:3000/contact */}
          <Route path="/contact" element={<Contact />} />

          {/* Optional: Catch-all route for 404 - Not Found */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;