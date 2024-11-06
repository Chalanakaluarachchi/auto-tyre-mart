import React from 'react';

const ProductCard = ({ product }) => {
  const price = Number(product.price); // Convert to number

  return (
    <div className="border p-4 rounded-md shadow-md m-2 w-72">
      <img src="./tyre.png" alt={product.description} className="my-2 w-52 h-52 object-cover" />
      <h2 className="text-lg font-bold">{product.description}</h2>
      <p className="text-xl font-semibold">Rs.{price.toFixed(2)}</p>
      <p
  className={`text-gray-500 ${
    product.stock === 0 ? 'text-red-500' : 'text-green-500'
  }`}
>
  Stock: {product.stock === 0 ? 'Out of Stock' : `${product.stock} Available`}
</p>
    </div>
  );
};

export default ProductCard;
