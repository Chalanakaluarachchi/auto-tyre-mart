import React, { useState, useEffect } from "react";
import ProductCard from "../components/product-card"; // Ensure the correct import path
import "../fade.css";

const ItemPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    getItemsPerPage(window.innerWidth)
  );

  function getItemsPerPage(width) {
    if (width >= 1024) return 12;
    if (width >= 768) return 6;
    return 4;
  }

  // Fetch products from Node.js API
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.recordset.map((product) => ({
          ...product,
          price: Number(product.price), // Ensure price is a number
        }));
        setProducts(formattedData);
        setFilteredProducts(formattedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
      setCurrentPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const matchingSuggestions = products
        .filter(
          (product) =>
            product.description &&
            product.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="h-svh">
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInput}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-l-md"
        />
        <button
          onClick={() => setSearchTerm(searchTerm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex justify-center">
          <ul className="bg-white border mt-2 rounded-md w-1/2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setSearchTerm(suggestion.description);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row mx-4">
        <div className="flex flex-wrap justify-center md:justify-center mt-4 md:mt-0 md:w-full">
          {currentItems.map((product, index) => (
            <div
              key={product.id}
              className="animate-fadeIn mt-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 mx-16 mb-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 rounded-md bg-gray-300 text-black disabled:opacity-50"
        >
          Previous
        </button>

        {currentPage > 2 && (
          <button
            onClick={() => handlePageChange(1)}
            className="hidden lg:block mx-1 px-4 py-2 rounded-md bg-gray-300 text-black"
          >
            1
          </button>
        )}

       
        {currentPage > 3 && (
          <span className="hidden lg:block mx-1 px-2">...</span>
        )}

        
        {Array.from({ length: 3 }, (_, index) => currentPage - 1 + index)
          .filter((page) => page >= 1 && page <= totalPages)
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-2 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {page}
            </button>
          ))}

       
        {currentPage < totalPages - 2 && (
          <span className="hidden lg:block mx-1 px-2">...</span>
        )}

       
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="hidden lg:block mx-1 px-4 py-2 rounded-md bg-gray-300 text-black"
          >
            {totalPages}
          </button>
        )}

        {/* Next Button */}
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
