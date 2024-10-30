// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  // Ensure price is a number before formatting
  const price = Number(product.price); // Convert to number

  return (
    <div className="border p-4 rounded-md shadow-md m-2 w-60">
      <img src={product.image} alt={product.description} className="my-2 w-52 h-52 object-cover" />
      <h2 className="text-lg font-bold">{product.description}</h2>
      
      <p className="text-xl font-semibold">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
