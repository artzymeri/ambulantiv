import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/productcard.css";
import { Add, AddShoppingCart, LocalMall, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";

const ProductCard = (props) => {
  const [isClient, setIsClient] = useState(false);

  const parsedLocalStorageCartItems = JSON.parse(
    localStorage.getItem("cartProducts")
  );

  const [cartProducts, setCartProducts] = useState(
    parsedLocalStorageCartItems || []
  );

  const updateLocalStorage = () => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  };

  useEffect(() => {
    setIsClient(true);
    updateLocalStorage();
  }, [cartProducts]);

  const { photo, price, name, weight, distributor, id } = props.product;

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const storedValue = getLocalStorageQuantity(`productId:${id}`);

  const [number, setNumber] = useState(parseInt(storedValue) || 0);

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
          {number < 1 ? (
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
              localStorage.setItem(`productId:${id}`, parseInt(e.target.value));
              setNumber(parseInt(e.target.value));
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
            setCartProducts((prevCartProducts) => {
              const newProduct = {
                id: id,
                name: name,
                price: price,
                weight: weight,
                quantity: number,
                distributor: distributor,
                photo: photo,
              };
              return prevCartProducts.concat(newProduct);
            });
            updateLocalStorage();
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

export default ProductCard;
