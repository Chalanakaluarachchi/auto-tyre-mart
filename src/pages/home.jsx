import React from 'react';
import '../fade.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('./bg.jpg')` }}>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text and Button */}
      <div className="relative z-10 text-center text-white px-4 animate-fadeIn">
        <img 
          src="./logo.png" // Replace with your image URL
          alt="Tyre" 
          className="w-60 h-60 mx-auto mb-4" 
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
          Welcome to <span className='text-6xl text-blue-300'>Auto Tyre Mart</span>
        </h1>
        <Link to="/items"> {/* Link to item page */}
          <button className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-800 hover:text-white transition duration-300">
           Search Items
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
