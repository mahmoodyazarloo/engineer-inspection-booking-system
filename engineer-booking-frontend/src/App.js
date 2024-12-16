import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EngineerDetails from './pages/EngineerDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/engineer/:id" element={<EngineerDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
