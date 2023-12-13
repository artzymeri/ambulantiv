import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartitem.css";
import { Tooltip, tooltipClasses } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import stateStorage from "@/store";
import styled from "@emotion/styled";

const CartItem = (props) => {
  const [isClient, setIsClient] = useState(false);

  const { id, name, price, weight, quantity, distributor, photo } =
    props.product;

  const { updateLocalStorage } = props;

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const parsedLocalStorageCartItems = JSON.parse(
    localStorage.getItem("cartProducts")
  );

  const [cartProducts, setCartProducts] = useState(
    parsedLocalStorageCartItems || []
  );

  const storedValue = getLocalStorageQuantity(`productId:${id}`);
  const [number, setNumber] = useState(parseInt(storedValue) || 1);

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setTotalValue(number * price);
    setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
  }, [number, price]);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      borderRadius: "10px",
      fontSize: "12px",
      border: "1px solid lightgray",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    },
  }));

  return (
    isClient && (
      <div className="cart-item-parent">
        <div className="cart-item-left-side">
          <div className="cart-item-left-side-l">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <img src={photo} style={{ height: "250px", width: "auto" }} />
                </React.Fragment>
              }
            >
              <img src={photo} />
            </HtmlTooltip>
          </div>
          <div className="cart-item-left-side-r">
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
              {number < 2 ? (
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
                  if (e.target.value <= 0) {
                    return null;
                  } else {
                    localStorage.setItem(
                      `productId:${id}`,
                      parseInt(e.target.value)
                    );
                    setNumber(parseInt(e.target.value));
                  }
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
          <div
            className="cart-item-right-side-r"
            onClick={() => {
              updateLocalStorage(id);
              stateStorage.updateCartItems();
            }}
          >
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
