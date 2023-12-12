import React from "react";
import "@/styling/Pranues/cartitem.css";

const CartItem = (props) => {
  const { id, name, price, weight, quantity, distributor, photo } =
    props.product;

  return (
    <div className="cart-item-parent">
      <div className="left-side">
        <img src={photo} height={"40px"} />
        <div>
          <h6>{name}</h6>
          <p>
            {weight}, {distributor}
          </p>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-l">quantity + price per item</div>
        <div className="right-side-m">total price</div>
        <div className="right-side-r">remove button</div>
      </div>
    </div>
  );
};

export default CartItem;
