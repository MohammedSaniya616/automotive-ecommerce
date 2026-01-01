import React, { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then(res => res.json())
      .then(data => setCartItems(data));
  }, []);

  // Clear cart function
  const clearCart = () => {
    fetch("http://localhost:5000/api/cart", {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        setCartItems([]);
        alert("Cart cleared");
      });
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <p key={index}>
              {item.name} – ₹{item.price}
            </p>
          ))}

          <button onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
