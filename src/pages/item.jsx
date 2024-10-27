// ItemPage.jsx
import React, { useState } from 'react';
import FilterSearchBar from '../components/filtersearchbar';
import ProductCard from '../components/product-card';
import products from '../config/data.json';

const ItemPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

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
  };

  return (
    <div className="flex flex-col md:flex-row">
      <FilterSearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center md:justify-start mt-4 md:mt-0">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
