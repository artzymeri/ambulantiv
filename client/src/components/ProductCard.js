import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/productcard.css";
import { Add, AddShoppingCart, LocalMall, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import stateStorage from "@/store";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

const ProductCard = (props) => {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

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

    // Get existing cart products from local storage
    const existingCartProducts = storedCartProducts
      ? JSON.parse(
          localStorage.getItem(
            `clientId:${localStorage.getItem("userId")}/cartProducts`
          )
        )
      : [];

    // Add the new product to the array
    const updatedCartProducts = [...existingCartProducts, newProduct];

    // Update local storage with the updated array
    localStorage.setItem(
      `clientId:${localStorage.getItem("userId")}/cartProducts`,
      JSON.stringify(updatedCartProducts)
    );

    // Update the state
    setCartProducts(updatedCartProducts);
  };

  const storedCartProducts = localStorage.getItem(
    `clientId:${localStorage.getItem("userId")}/cartProducts`
  );
  const parsedLocalStorageCartItems = storedCartProducts
    ? JSON.parse(storedCartProducts)
    : [];

  const [cartProducts, setCartProducts] = useState(
    JSON.parse(
      localStorage.getItem(
        `clientId:${localStorage.getItem("userId")}/cartProducts`
      )
    ) || []
  );

  useEffect(() => {
    setIsClient(true);
    updateLocalStorage(cartProducts);
    stateStorage.updateCartItems();
  }, [cartProducts]);

  const {
    photo,
    price,
    name,
    weight,
    distributor,
    id,
    outOfStock,
    discounted,
    discountedPercentage,
  } = props.product;

  const getLocalStorageQuantity = (id) => {
    return localStorage.getItem(id);
  };

  const storedValue = getLocalStorageQuantity(
    `clientId:${localStorage.getItem("userId")}/productId:${id}`
  );

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
                localStorage.setItem(
                  `clientId:${localStorage.getItem("userId")}/productId:${id}`,
                  number - 1
                );
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
                  `clientId:${localStorage.getItem("userId")}/productId:${id}`,
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
              localStorage.setItem(
                `clientId:${localStorage.getItem("userId")}/productId:${id}`,
                number + 1
              );
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
    isClient &&
    (outOfStock ? (
      <div className="product-card-parent out-of-stock">
        <img src={photo} />
        <div className="product-card-text-container">
          <div className="product-card-text-up">
            <h3 style={{ width: "180px" }}>{name}</h3>
            <p style={{ fontSize: "13px" }}>
              {weight},{" "}
              <Tooltip title="Kliko për të shikuar produktet e kompanisë">
                <span
                  onClick={() => {
                    router.push({
                      pathname: "/pranues/products/company",
                      query: {
                        companyname: distributor,
                      },
                    });
                  }}
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {distributor}
                </span>
              </Tooltip>
            </p>
          </div>
          <div className="product-card-text-down">
            <h2>{price}€</h2>
            <Tooltip title="Produkti është jashtë stokut" key={id}>
              <ButtonGroup
                variant="outlined"
                color="success"
                style={{
                  background: "whitesmoke",
                  boxShadow: "none",
                  cursor: "not-allowed !important",
                  height: "42px",
                }}
              >
                <Button
                  sx={{
                    width: "auto",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "black",
                    cursor: "not-allowed !important",
                  }}
                >
                  jashtë Stokut
                </Button>
              </ButtonGroup>
            </Tooltip>
          </div>
        </div>
      </div>
    ) : discounted ? (
      <div className="product-card-parent">
        <Tooltip title="Produkti është në aksion">
          <div className="discounted-badge">- {discountedPercentage}%</div>
        </Tooltip>
        <img src={photo} />
        <div className="product-card-text-container">
          <div className="product-card-text-up">
            <h4 style={{ width: "180px" }}>{name}</h4>
            <p style={{ fontSize: "13px" }}>
              {weight},{" "}
              <Tooltip title="Kliko për të shikuar produktet e kompanisë">
                <span
                  onClick={() => {
                    router.push({
                      pathname: "/pranues/products/company",
                      query: {
                        companyname: distributor,
                      },
                    });
                  }}
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {distributor}
                </span>
              </Tooltip>
            </p>
          </div>
          <div className="product-card-text-down">
            <div className="discounted-before-price">{price}</div>
            <h2>{price - (price * discountedPercentage) / 100}€</h2>
            {buttonsGroup()}
          </div>
        </div>
      </div>
    ) : (
      <div className="product-card-parent">
        <img src={photo} />
        <div className="product-card-text-container">
          <div className="product-card-text-up">
            <h4 style={{ width: "180px" }}>{name}</h4>
            <p style={{ fontSize: "13px" }}>
              {weight},{" "}
              <Tooltip title="Kliko për të shikuar produktet e kompanisë">
                <span
                  onClick={() => {
                    router.push({
                      pathname: "/pranues/products/company",
                      query: {
                        companyname: distributor,
                      },
                    });
                  }}
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {distributor}
                </span>
              </Tooltip>
            </p>
          </div>
          <div className="product-card-text-down">
            <h2>{price}€</h2>
            {buttonsGroup()}
          </div>
        </div>
      </div>
    ))
  );
};

export default observer(ProductCard);
