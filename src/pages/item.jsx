// ItemPage.jsx
import React, { useState, useEffect } from 'react';
import FilterSearchBar from '../components/filtersearchbar';
import ProductCard from '../components/product-card';
import products from '../config/data.json';
import '../fade.css';

const ItemPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerWidth)); // Get initial items per page

  // Function to determine items per page based on screen width
  function getItemsPerPage(width) {
    if (width >= 1024) return 12; // Large screens
    if (width >= 768) return 6;   // Medium screens
    return 4;                     // Small screens
  }

  // Handle search functionality
  const handleSearch = (filters) => {
    const filtered = products.filter((product) => {
      return (
        (filters.tyreType ? product.tyreType === filters.tyreType : true) &&
        (filters.brand ? product.brand === filters.brand : true) &&
        (filters.width ? product.width === filters.width : true) &&
        (filters.height ? product.height === filters.height : true) &&
        (filters.diameter ? product.diameter === filters.diameter : true) &&
        (filters.manufacture ? product.manufacture === filters.manufacture : true) &&
        (filters.model ? product.model === filters.model : true) &&
        (filters.loadIndex ? product.loadIndex === filters.loadIndex : true) &&
        (filters.speedRating ? product.speedRating === filters.speedRating : true) &&
        (filters.minPrice ? product.price >= filters.minPrice : true) &&
        (filters.maxPrice ? product.price <= filters.maxPrice : true)
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

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
      setItemsPerPage(getItemsPerPage(window.innerWidth)); // Update items per page on resize
      setCurrentPage(1); // Reset to first page on resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='h-full'>
      <div className="flex flex-col md:flex-row">
        <div className='md:w-1/3'>
          <FilterSearchBar onSearch={handleSearch} />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mt-4 md:mt-0 md:w-2/3">
          {currentItems.map((product, index) => (
            <div key={product.id} className={`animate-fadeIn mt-4`} style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-6 mx-16 mb-6">
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
