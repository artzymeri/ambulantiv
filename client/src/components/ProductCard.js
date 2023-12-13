import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/productcard.css";
import { Add, AddShoppingCart, LocalMall, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import stateStorage from "@/store";
import { observer } from "mobx-react";

const ProductCard = (props) => {
  const [isClient, setIsClient] = useState(false);

  const { updateLocalStorage, activateSnackbar } = props;

  const updateCartItems = () => {
    const newProduct = {
      id: id,
      name: name,
      price: price,
      weight: weight,
      quantity: number,
      distributor: distributor,
      photo: photo,
      client: localStorage.getItem("companyname"),
    };

    console.log(newProduct);

    // Get existing cart products from local storage
    const existingCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];

    // Add the new product to the array
    const updatedCartProducts = [...existingCartProducts, newProduct];

    // Update local storage with the updated array
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));

    // Update the state
    setCartProducts(updatedCartProducts);
  };

  const parsedLocalStorageCartItems = JSON.parse(
    localStorage.getItem("cartProducts")
  );

  const [cartProducts, setCartProducts] = useState(
    parsedLocalStorageCartItems || []
  );

  useEffect(() => {
    setIsClient(true);
    updateLocalStorage(cartProducts);
    stateStorage.updateCartItems();
  }, [cartProducts]);

  const { photo, price, name, weight, distributor, id } = props.product;

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const storedValue = getLocalStorageQuantity(`productId:${id}`);

  const [number, setNumber] = useState(parseInt(storedValue) || 1);

  const buttonsGroup = () => {
    for (const product of cartProducts) {
      if (product.id === id) {
        return (
          <Tooltip title="Produkti është vendosur në shportë" key={product.id}>
            <ButtonGroup
              variant="contained"
              color="success"
              disabled
              style={{
                background: "whitesmoke",
                boxShadow: "none",
                cursor: "not-allowed",
              }}
            >
              <Button sx={{ width: "35px" }}>
                <LocalMall sx={{ width: "20px" }} />
              </Button>
            </ButtonGroup>
          </Tooltip>
        );
      }
    }

    return (
      <ButtonGroup
        variant="contained"
        color="success"
        style={{
          background: "whitesmoke",
          boxShadow: "none",
        }}
      >
        <div className="increase-decrease-container">
          {number < 2 ? (
            <span className="increase-decrease-buttons cursor-disabled">
              <Remove sx={{ height: "15px", color: "#81c784" }} />
            </span>
          ) : (
            <span
              className="increase-decrease-buttons"
              onClick={() => {
                localStorage.setItem(`productId${id}`, number - 1);
                setNumber(number - 1);
              }}
            >
              <Remove sx={{ height: "15px", color: "#81c784" }} />
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
            className="increase-decrease-number"
          />
          <span
            className="increase-decrease-buttons"
            onClick={() => {
              localStorage.setItem(`productId:${id}`, number + 1);
              setNumber(number + 1);
            }}
          >
            <Add sx={{ height: "15px", color: "#81c784" }} />
          </span>
        </div>
        <Button
          sx={{ width: "35px" }}
          onClick={() => {
            updateCartItems();
            activateSnackbar();
          }}
        >
          <AddShoppingCart sx={{ width: "20px" }} />
        </Button>
      </ButtonGroup>
    );
  };

  return (
    isClient && (
      <div className="product-card-parent">
        <img src={photo} />
        <div className="product-card-text-container">
          <div className="product-card-text-up">
            <h3 style={{ width: "180px" }}>{name}</h3>
            <p style={{ fontSize: "13px" }}>
              {weight}, <b>{distributor}</b>
            </p>
          </div>
          <div className="product-card-text-down">
            <h2>{price}€</h2>
            {buttonsGroup()}
          </div>
        </div>
      </div>
    )
  );
};

export default observer(ProductCard);
