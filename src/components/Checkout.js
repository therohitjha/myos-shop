import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/reducers/products";
import "../styles/Checkout.css";

function Checkout() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { user } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return isOrderPlaced ? (
    <div className="checkout-success">
      {user}, Your order has been placed successfully!
    </div>
  ) : (
    <div className="checkout-container">
      {" "}
      {user},Please enter your email address to place the order.
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(resetCart());
          setIsOrderPlaced(true);
        }}
      >
        <input type={"email"} placeholder={"Enter your mail"} required />
        <button className="checkout-button" type="submit">
          Place the order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
