import React, { useState } from 'react';

const FilterSearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    tyreType: '',
    brand: '',
    width: '',
    height: '',
    diameter: '',
    manufacture: '',
    model: '',
    loadIndex: '',
    speedRating: '',
    minPrice: '',
    maxPrice: ''
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Call onSearch with the current filters
  const handleSearch = () => {
    if (typeof onSearch === 'function') {
      onSearch(filters);
    }
  };

  // Reset filters to default values
  const handleClear = () => {
    setFilters({
      tyreType: '',
      brand: '',
      width: '',
      height: '',
      diameter: '',
      manufacture: '',
      model: '',
      loadIndex: '',
      speedRating: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="bg-gray-100 p-4 w-96 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="material-icons mr-2">Tyre</span> Filters
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Type of Tyre</label>
        <select
          name="tyreType"
          value={filters.tyreType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select tyre type</option>
          <option value="All-season">All-season</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Brand</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          <option value="Dunlop">Dunlop</option>
          <option value="DSI">DSI</option>
          <option value="MRF">MRF</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tyre Size</label>
        <div className="flex gap-2">
          <input
            type="text"
            name="width"
            placeholder="Width"
            value={filters.width}
            onChange={handleChange}
            className="w-1/3 border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="height"
            placeholder="Height"
            value={filters.height}
            onChange={handleChange}
            className="w-1/3 border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="diameter"
            placeholder="Diameter"
            value={filters.diameter}
            onChange={handleChange}
            className="w-1/3 border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Vehicle Model</label>
        <select
          name="manufacture"
          value={filters.manufacture}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-2"
        >
          <option value="">Manufacture</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="Honda">Honda</option>
        </select>
        <select
          name="model"
          value={filters.model}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Model</option>
          <option value="Camry">Camry</option>
          <option value="Mustang">Mustang</option>
          <option value="Civic">Civic</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Load Index</label>
        <select
          name="loadIndex"
          value={filters.loadIndex}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          <option value="91">91</option>
          <option value="95">95</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Speed Rating</label>
        <select
          name="speedRating"
          value={filters.speedRating}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          <option value="T">T</option>
          <option value="H">H</option>
          <option value="V">V</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      <button
        className="bg-yellow-400 text-white w-full py-2 rounded hover:bg-yellow-500 font-semibold"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="mt-2 text-blue-600 w-full py-2 rounded"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
};

export default FilterSearchBar;
