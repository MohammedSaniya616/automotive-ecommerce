import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("http://localhost:5000/api/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const addToCart = (product) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(() => window.location.reload());
  };

  const placeOrder = () => {
    fetch("http://localhost:5000/api/order", { method: "POST" })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Automotive Parts Store</h1>

      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id}>
          {p.name} – ₹{p.price}
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((c, i) => (
        <div key={i}>{c.name} – ₹{c.price}</div>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default App;
