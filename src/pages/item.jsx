// ItemPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product-card'; // Ensure the correct import path
import '../fade.css';

const ItemPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerWidth));

  // Function to determine items per page based on screen width
  function getItemsPerPage(width) {
    if (width >= 1024) return 15;
    if (width >= 768) return 6;
    return 4;
  }

  // Fetch products from PHP API
  useEffect(() => {
    fetch('http://localhost/db.php')
      .then(response => response.json())
      .then(data => {
        // Ensure prices are numbers
        const formattedData = data.map(product => ({
          ...product,
          price: Number(product.price) // Ensure price is a number
        }));
        setFilteredProducts(formattedData);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Effect to handle window resize and adjust items per page
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
      setCurrentPage(1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle search input change for suggestions
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const matchingSuggestions = filteredProducts.filter(product =>
        product.description && product.description.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit suggestions to top 5 matches
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Execute search on button click
  const handleSearch = () => {
    const filtered = filteredProducts.filter(product =>
      product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
    setSuggestions([]);
  };

  return (
    <div className="h-svh">
      {/* Search Bar */}
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInput}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex justify-center">
          <ul className="bg-white border mt-2 rounded-md w-1/2">
            {suggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setSearchTerm(suggestion.description);
                  handleSearch();
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-col md:flex-row mx-4">
        <div className="flex flex-wrap justify-center md:justify-center mt-4 md:mt-0 md:w-full">
          {currentItems.map((product, index) => (
            <div key={product.id} className="animate-fadeIn mt-4" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 mx-16 mb-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 rounded-md bg-gray-300 text-black disabled:opacity-50"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1 px-4 py-2 rounded-md bg-gray-300 text-black disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
