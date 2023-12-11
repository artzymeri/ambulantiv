import React from "react";
import "@/styling/Pranues/cartitem.css";

const CartItem = (props) => {
  const { id, name, price, weight, quantity, distributor } = props.product;

  return (
    <div className="cart-item-parent">
      <h6>{name}</h6>
      <h6>{price}</h6>
      <h6>{weight}</h6>
      <h6>{quantity}</h6>
      <h6>{distributor}</h6>
    </div>
  );
};

export default CartItem;
