import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { ShoppingBag } from "@mui/icons-material";

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
          {/* {cartProductsList.map((product) => {
            return (
              <>
                <h6>{product.name}</h6>
                <h6>{product.price}</h6>
                <h6>{product.weight}</h6>
                <h6>{product.quantity}</h6>
                <h6>{product.distributor}</h6>
              </>
            );
          })} */}
        </div>
      </div>
    )
  );
};

export default CartView;
