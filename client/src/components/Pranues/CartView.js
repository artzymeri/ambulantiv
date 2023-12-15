import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import stateStorage from "@/store";

const CartItem = dynamic(() => import("@/components/Pranues/CartItem"), {
  ssr: false,
});

const CartView = () => {
  const [isClient, setIsClient] = useState(false);

  const [cartProductsList, setCartProductsList] = useState(
    JSON.parse(
      localStorage.getItem(
        `clientId:${localStorage.getItem("userId")}/cartProducts`
      )
    ) || []
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const updateLocalStorage = (id) => {
    const newArray = cartProductsList.filter((product) => product.id !== id);
    setCartProductsList(newArray);
    localStorage.setItem(
      `clientId:${localStorage.getItem("userId")}/cartProducts`,
      JSON.stringify(newArray)
    );
    localStorage.removeItem(
      `clientId:${localStorage.getItem("userId")}/productId:${id}`
    );
    setSnackbarData({
      title: "success",
      message: "Produkti u largua nga shporta",
    });
    setSnackbarOpen(true);
  };

  useEffect(() => {
    setIsClient(true);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`Key: ${key}, Value: ${value}`);
    }
  }, []);

  const giveParentTheNewProducts = (updatedCartItems) => {
    setCartProductsList(updatedCartItems);
  };

  const orderAll = () => {
    for (const product of cartProductsList) {
      try {
        axios
          .post("http://localhost:8080/sendorder", {
            product,
            client: localStorage.getItem("companyname"),
          })
          .then((res) => {
            const { title, message } = res.data;
            if (title === "success") {
              localStorage.removeItem(
                `clientId:${localStorage.getItem("userId")}/cartProducts`
              );
              setCartProductsList([]);
              localStorage.removeItem(
                `clientId:${localStorage.getItem("userId")}/productId:${
                  product.id
                }`
              );
              stateStorage.updateCartItems();
            }
            setSnackbarData({
              title: title,
              message: message,
            });
            setSnackbarOpen(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    isClient && (
      <>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={snackbarData.title.toLowerCase()}
          >
            {snackbarData.message}
          </MuiAlert>
        </Snackbar>
        <div className="cart-view-parent">
          <div className="cart-view-navbar">
            <ShoppingBag sx={{ color: "rgb(130, 30, 30)" }} />
            <h3 style={{ color: "rgb(130, 30, 30)" }}>Shporta</h3>
          </div>
          <div className="cart-view-items-wrapper">
            {cartProductsList && cartProductsList.length > 0 ? (
              cartProductsList.map((product) => (
                <CartItem
                  updateLocalStorage={updateLocalStorage}
                  product={product}
                  giveParentTheNewProducts={giveParentTheNewProducts}
                  key={[product.id]}
                />
              ))
            ) : (
              <div
                style={{
                  alignSelf: "center",
                  marginTop: "60px",
                  color: "gray",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "not-allowed",
                }}
              >
                <RemoveCircle />
                Nuk keni produkte akoma në shportë
              </div>
            )}
          </div>
          {cartProductsList && cartProductsList.length > 0 ? (
            <Button
              variant="contained"
              color="success"
              className="cart-view-order-button"
              onClick={orderAll}
            >
              <LocalShipping />
              Porosit
            </Button>
          ) : null}
        </div>
      </>
    )
  );
};

export default CartView;
