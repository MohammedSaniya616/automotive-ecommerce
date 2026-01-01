import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ADD TO CART FUNCTION
  const addToCart = (product) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(() => {
        alert("Product added to cart");
      });
  };

  return (
    <div>
      <h2>Available Automotive Parts</h2>

      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Category: {product.category}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;

