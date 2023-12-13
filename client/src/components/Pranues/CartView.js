import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const CartItem = dynamic(() => import("@/components/Pranues/CartItem"), {
  ssr: false,
});

const CartView = () => {
  const [isClient, setIsClient] = useState(false);
  const [cartProductsList, setCartProductsList] = useState([]);

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
    localStorage.setItem("cartProducts", JSON.stringify(newArray));
    localStorage.removeItem(`productId:${id}`);
    setSnackbarData({
      title: "success",
      message: "Produkti u largua nga shporta",
    });
    setSnackbarOpen(true);
  };

  useEffect(() => {
    setIsClient(true);
    setCartProductsList(JSON.parse(localStorage.getItem("cartProducts")));
  }, []);

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
