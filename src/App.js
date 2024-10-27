import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Item from './pages/item';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="p-4 bg-slate-800 text-white flex justify-center space-x-4">
          <Link to="/" className="font-semibold">Home</Link>
          <Link to="/items" className="font-semibold">Items</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Item />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
