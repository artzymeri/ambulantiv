import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartitem.css";
import { Tooltip, tooltipClasses } from "@mui/material";
import { Add, Discount, Percent, Remove } from "@mui/icons-material";
import stateStorage from "@/store";
import styled from "@emotion/styled";

const CartItem = (props) => {
  const [isClient, setIsClient] = useState(false);

  const { id, name, price, weight, quantity, distributor, photo, discounted } =
    props.product;

  const { disabled } = props;

  const { updateLocalStorage, giveParentTheNewProducts } = props;

  const onQuantityChange = () => {
    const updatedOnQuantityItem = {
      id: id,
      name: name,
      price: price,
      totalPrice: totalValue.toFixed(2),
      weight: weight,
      quantity: number,
      distributor: distributor,
      client: localStorage.getItem("companyname"),
      photo: photo,
      discounted: discounted,
    };

    const existingCartProducts =
      JSON.parse(
        localStorage.getItem(
          `clientId:${localStorage.getItem("userId")}/cartProducts`
        )
      ) || [];

    const indexToUpdate = existingCartProducts.findIndex(
      (item) => item.id === updatedOnQuantityItem.id
    );

    if (indexToUpdate !== -1) {
      // Replace the item at the found index with the updated item
      existingCartProducts[indexToUpdate] = updatedOnQuantityItem;

      // Update localStorage with the modified array
      localStorage.setItem(
        `clientId:${localStorage.getItem("userId")}/cartProducts`,
        JSON.stringify(existingCartProducts)
      );
    }
    stateStorage.updateCartItems();
    giveParentTheNewProducts(existingCartProducts);
  };

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const [storedValue, setStoredValue] = useState(
    localStorage.getItem(
      `clientId:${localStorage.getItem("userId")}/productId:${id}`
    )
  );

  const [number, setNumber] = useState(parseInt(storedValue) || 1);

  const [totalValue, setTotalValue] = useState(number * price);

  useEffect(() => {
    setIsClient(true);
    setTotalValue(number * price);
    onQuantityChange();
    stateStorage.updateCartItems();
    setStoredValue(
      localStorage.getItem(
        `clientId:${localStorage.getItem("userId")}/productId:${id}`
      )
    );
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
      <div
        className={`cart-item-parent ${disabled ? "disabled-cart-item" : ""}`}
      >
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
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <h4>{name} </h4>
              {discounted && (
                <Tooltip title="Produkti i zgjedhur ka çmim në zbritje">
                  <div
                    style={{
                      padding: "3px",
                      borderRadius: "50%",
                      background: "red",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                      marginLeft: "3px",
                      cursor: "help",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Percent sx={{ height: "15px", fontWeight: "bold" }} />
                  </div>
                </Tooltip>
              )}
              {disabled ? (
                <Tooltip title="Nuk ka sasi furnizuese për këtë produkt momentalisht">
                  <span
                    style={{
                      fontSize: "11px",
                      marginLeft: "3px",
                      background: "red",
                      padding: "2px 8px",
                      borderRadius: "50px",
                      color: "white",
                      cursor: "not-allowed",
                      fontWeight: "600",
                    }}
                  >
                    Produkti është jashtë stokut
                  </span>
                </Tooltip>
              ) : null}
            </div>
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
                    onQuantityChange();
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
                      `clientId:${localStorage.getItem(
                        "userId"
                      )}/productId:${id}`,
                      parseInt(e.target.value)
                    );
                    setNumber(parseInt(e.target.value));
                    onQuantityChange();
                  }
                }}
                type="number"
                className="increase-decrease-number-cart"
              />
              <span
                className="increase-decrease-buttons-cart"
                onClick={() => {
                  localStorage.setItem(
                    `clientId:${localStorage.getItem(
                      "userId"
                    )}/productId:${id}`,
                    number + 1
                  );
                  setNumber(number + 1);
                  onQuantityChange();
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
