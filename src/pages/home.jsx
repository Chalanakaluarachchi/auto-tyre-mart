import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import '../fade.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('./bg.jpg')` }}>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text, Logo, Search Bar, and Button */}
      <div className="relative z-10 text-center text-white px-4 animate-fadeIn">
        <img 
          src="./logo.png" // Replace with your image URL
          alt="Tyre" 
          className="w-60 h-60 mx-auto mb-4" 
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
          Welcome to <span className='text-6xl text-blue-300'>Auto Tyre Mart</span>
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-l-md text-black"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <Link to="/items" className="mt-4 inline-block">
          <button className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-800 hover:text-white transition duration-300">
           Browse All Items
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
