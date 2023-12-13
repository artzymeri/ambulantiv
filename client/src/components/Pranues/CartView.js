import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { ShoppingBag } from "@mui/icons-material";
import { Button } from "@mui/material";

const CartItem = dynamic(() => import("@/components/Pranues/CartItem"), {
  ssr: false,
});

const CartView = () => {
  const [isClient, setIsClient] = useState(false);
  const [cartProductsList, setCartProductsList] = useState([]);

  const updateLocalStorage = (id) => {
    const newArray = cartProductsList.filter((product) => product.id !== id);
    setCartProductsList(newArray);
    localStorage.setItem("cartProducts", JSON.stringify(newArray));
    localStorage.removeItem(`productId:${id}`);
  };

  useEffect(() => {
    setIsClient(true);
    setCartProductsList(JSON.parse(localStorage.getItem("cartProducts")));
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
            return (
              <CartItem
                updateLocalStorage={updateLocalStorage}
                product={product}
              />
            );
          })}
        </div>
        {cartProductsList && cartProductsList.length > 0 ? (
          <Button
            variant="contained"
            color="success"
            className="cart-view-order-button"
          >
            Porosit
          </Button>
        ) : null}
      </div>
    )
  );
};

export default CartView;
