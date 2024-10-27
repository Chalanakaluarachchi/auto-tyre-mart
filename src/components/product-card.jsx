// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 m-2 flex flex-col items-center w-64 h-80"> {/* Fixed size */}
      <img 
        src={product.image} 
        alt={`${product.brand} ${product.tyreType}`} 
        className="w-full h-40 object-cover mb-2 rounded" 
      />
      <h3 className="text-lg font-semibold text-center">{product.tyreType} - {product.brand}</h3>
      <p className="text-center">{product.width}/{product.height}R{product.diameter}</p>
      <p className="text-gray-700">Rs. {product.price}</p>
      {product.inStock ? (
        <button className="mt-2 bg-green-600 text-white rounded-lg py-1 px-3 hover:bg-green-900 transition duration-200">
          Available
        </button>
      ) : (
        <p className="mt-2 text-red-600 font-semibold">Out of Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
