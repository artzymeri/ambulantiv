import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranueshome.css";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const PranuesHomeView = () => {
  const [isClient, setIsClient] = useState(false);

  const [productsData, setProductsData] = useState([]);

  const [clientId, setClientId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    setIsClient(true);
    axios.get("http://localhost:8080/getlistedproducts").then((res) => {
      setProductsData(res.data);
    });
  }, []);

  const updateLocalStorage = (newArray) => {
    localStorage.setItem(
      `clientId:${clientId}/cartProducts`,
      JSON.stringify(newArray)
    );
  };

  const activateSnackbar = () => {
    setSnackbarData({
      title: "success",
      message: "Produkti u shtua në shportë",
    });
    setSnackbarOpen(true);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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
        <div className="pranues-home-parent">
          <div className="pranues-home-latestproducts b-25 shadow-one">
            {productsData
              .slice()
              .reverse()
              .map((product) => {
                return (
                  <ProductCard
                    product={product}
                    updateLocalStorage={updateLocalStorage}
                    activateSnackbar={activateSnackbar}
                  />
                );
              })}
          </div>
          <div className="pranues-home-child b-25 shadow-one"></div>
          <div className="pranues-home-child b-25 shadow-one"></div>
        </div>
      </>
    )
  );
};

export default PranuesHomeView;
