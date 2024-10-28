import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Item from './pages/item';

const App = () => {
  return (
    <Router>
      <div className="App flex flex-col h-auto">
        
        {/* Header */}
        <header className="p-4 bg-slate-800 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="./logo.png" alt="Logo" className="w-8 h-8" /> {/* Update with your logo path */}
            <span className="font-bold text-lg">Auto Tyre Mart</span>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="font-semibold hover:text-gray-300 transition-colors duration-300">Home</Link>
            <Link to="/items" className="font-semibold hover:text-gray-300 transition-colors duration-300">Items</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Item />} />
          </Routes>
        </main>
        
        {/* Footer 
        <footer className="p-4 bg-slate-800 text-white text-center">
          <p>All rights reserved Proxima-Kegalle © {new Date().getFullYear()}</p>
        </footer>*/}
      </div>
    </Router>
  );
};

export default App;
