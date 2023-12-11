import React, { useState, useEffect } from 'react';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error(error));
  }, []);

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span>{product.price}</span>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;