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

  const [listedProducts, setListedProducts] = useState([]);

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
    axios.get("http://localhost:8080/getlistedproducts").then((res) => {
      setListedProducts(res.data);
    });
  }, []);

  const giveParentTheNewProducts = (updatedCartItems) => {
    setCartProductsList(updatedCartItems);
  };

  const orderAll = () => {
    const productsToOrder = cartProductsList.filter((product) =>
      listedProducts.some(
        (listedProduct) =>
          !listedProduct.outOfStock && listedProduct.name === product.name
      )
    );

    console.log(productsToOrder);

    if (productsToOrder.length === 0) {
      // Handle the case where all products are disabled
      setSnackbarData({
        title: "warning",
        message: "Nuk ka produkte të disponueshme për të porositur",
      });
      setSnackbarOpen(true);
      return;
    }

    for (const product of productsToOrder) {
      try {
        console.log("finished");
        axios
          .post("http://localhost:8080/sendorder", {
            product,
            clientId: localStorage.getItem("userId"),
            clientName: localStorage.getItem("namesurname"),
            clientCompanyname: localStorage.getItem("companyname"),
          })
          .then((res) => {
            const { title, message } = res.data;
            setCartProductsList((prevCartProductsList) => {
              const newArray = prevCartProductsList.filter(
                (p) => p.id !== product.id
              );
              localStorage.setItem(
                `clientId:${localStorage.getItem("userId")}/cartProducts`,
                JSON.stringify(newArray)
              );
              localStorage.removeItem(
                `clientId:${localStorage.getItem("userId")}/productId:${
                  product.id
                }`
              );
              return newArray;
            });
            setSnackbarData({
              title: title,
              message: message,
            });
            setSnackbarOpen(true);
            stateStorage.updateCartItems();
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
            {cartProductsList.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                updateLocalStorage={updateLocalStorage}
                giveParentTheNewProducts={giveParentTheNewProducts}
                disabled={listedProducts.some(
                  (listedProduct) =>
                    listedProduct.outOfStock &&
                    listedProduct.name === product.name
                )}
              />
            ))}
            {cartProductsList.length === 0 && (
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
