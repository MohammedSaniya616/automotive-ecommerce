import React, { useEffect, useState } from "react";

function Checkout() {
  // cart items from backend
  const [cart, setCart] = useState([]);

  // order confirmation message
  const [message, setMessage] = useState("");

  // fetch cart items when page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  // calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // place order function
  const placeOrder = () => {
    fetch("http://localhost:5000/api/order", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setCart([]); // clear cart in UI
      });
  };

  return (
    <div>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <p key={index}>
              {item.name} – ₹{item.price}
            </p>
          ))}

          <h3>Total Amount: ₹{totalPrice}</h3>

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}

      {message && <h4>{message}</h4>}
    </div>
  );
}

export default Checkout;
