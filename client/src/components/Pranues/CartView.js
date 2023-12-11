import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { ShoppingBag } from "@mui/icons-material";
import CartItem from "./CartItem";

const CartView = () => {
  const [isClient, setIsClient] = useState(false);
  const [cartProductsList, setCartProductsList] = useState([]);

  useEffect(() => {
    setIsClient(true);
    setCartProductsList(JSON.parse(localStorage.getItem("cartProducts")));
    console.log(JSON.parse(localStorage.getItem("cartProducts")));
  }, []);

  return (
    isClient && (
      <div className="cart-view-parent">
        <div className="cart-view-navbar">
          <ShoppingBag sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Shporta</h3>
        </div>
        <div className="cart-view-items-wrapper">
          {cartProductsList.map((product) => {
            return <CartItem product={product} />;
          })}
        </div>
      </div>
    )
  );
};

export default CartView;
