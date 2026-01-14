import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Wall from './pages/Wall';
import CreateNote from './pages/CreateNote';
import Archive from './pages/Archive';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Wall />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
