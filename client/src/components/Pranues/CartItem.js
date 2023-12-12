import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartitem.css";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { Add, AddShoppingCart, Remove } from "@mui/icons-material";

const CartItem = (props) => {
  const [isClient, setIsClient] = useState(false);

  const { id, name, price, weight, quantity, distributor, photo } =
    props.product;

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const parsedLocalStorageCartItems = JSON.parse(
    localStorage.getItem("cartProducts")
  );

  const [cartProducts, setCartProducts] = useState(
    parsedLocalStorageCartItems || []
  );

  const updateLocalStorage = () => {
    const newArray = cartProducts.filter((product) => product.id !== id);
    setCartProducts(newArray);
    localStorage.setItem("cartProducts", JSON.stringify(newArray));
    localStorage.removeItem(`productId:${id}`);
  };

  const storedValue = getLocalStorageQuantity(`productId:${id}`);
  const [number, setNumber] = useState(parseInt(storedValue) || 0);

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setTotalValue(number * price);
    setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
  }, [number, price, cartProducts]);

  return (
    isClient && (
      <div className="cart-item-parent">
        <div className="cart-item-left-side">
          <img src={photo} />
          <div>
            <h4>{name}</h4>
            <p>
              {weight}, <span style={{ fontWeight: "600" }}>{distributor}</span>
            </p>
          </div>
        </div>
        <div className="cart-item-right-side">
          <div className="cart-item-right-side-l">
            <h5>{price}€</h5>
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>x</span>
            <div className="increase-decrease-container-cart">
              {number < 1 ? (
                <span className="increase-decrease-buttons-cart cursor-disabled">
                  <Tooltip title="Nuk mundeni të largoni më shumë sasi">
                    <Remove sx={{ height: "15px", color: "#81c784" }} />
                  </Tooltip>
                </span>
              ) : (
                <span
                  className="increase-decrease-buttons-cart"
                  onClick={() => {
                    localStorage.setItem(`productId${id}`, number - 1);
                    setNumber(number - 1);
                  }}
                >
                  <Tooltip title="Zbritni numrin e sasisë">
                    <Remove sx={{ height: "15px", color: "#81c784" }} />
                  </Tooltip>
                </span>
              )}
              <input
                value={number}
                onChange={(e) => {
                  localStorage.setItem(
                    `productId:${id}`,
                    parseInt(e.target.value)
                  );
                  setNumber(parseInt(e.target.value));
                }}
                type="number"
                className="increase-decrease-number-cart"
              />
              <span
                className="increase-decrease-buttons-cart"
                onClick={() => {
                  localStorage.setItem(`productId:${id}`, number + 1);
                  setNumber(number + 1);
                }}
              >
                <Tooltip title="Shtoni numrin e sasisë">
                  <Add sx={{ height: "15px", color: "#81c784" }} />
                </Tooltip>
              </span>
            </div>
          </div>
          <div className="cart-item-right-side-m">
            <h5>Totali:</h5>
            <h3>{totalValue.toFixed(2)}€</h3>
          </div>
          <div className="cart-item-right-side-r" onClick={updateLocalStorage}>
            <Tooltip title="Fshij produktin nga shporta">
              <Remove sx={{ color: "white" }} />
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default CartItem;
