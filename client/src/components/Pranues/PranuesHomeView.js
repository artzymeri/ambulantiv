import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranueshome.css";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Discount, Grade, Home } from "@mui/icons-material";

const PranuesHomeView = () => {
  const [isClient, setIsClient] = useState(false);

  const [productsData, setProductsData] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    setIsClient(true);
    axios.get("http://localhost:8080/getlistedproducts").then((res) => {
      setProductsData(res.data);
    });
    axios.get("http://localhost:8080/getdiscountedproducts").then((res) => {
      setDiscountedProducts(res.data);
    });
  }, []);

  const updateLocalStorage = (newArray) => {
    localStorage.setItem(
      `clientId:${localStorage.getItem("userId")}/cartProducts`,
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
        <div style={{ overflowY: "auto" }}>
          <div
            style={{
              width: "100%",
              background: "white",
              display: "flex",
              gap: "10px",
              border: "1px solid lightgray",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              flexShrink: "0",
              zIndex: "999",
              height: "70px",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.17em",
              fontWeight: "800",
              color: "rgb(130, 30, 30)",
            }}
          >
            <Home sx={{ marginBottom: "2px" }} />
            Ballina
          </div>
          <div className="pranues-home-parent">
            <div className="pranues-home-latestproducts-parent">
              <div className="pranues-home-latestproducts-title shadow-one">
                <Grade
                  sx={{
                    marginRight: "4px",
                  }}
                />
                Produktet e fundit
              </div>
              <div className="pranues-home-latestproducts b-25 shadow-one">
                {productsData && productsData.length > 0 ? (
                  productsData
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
                    })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    Nuk ka produkte të listuara
                  </div>
                )}
              </div>
            </div>
            <div className="pranues-home-latestproducts-parent">
              <div className="pranues-home-latestproducts-title shadow-one">
                <Discount
                  sx={{
                    marginRight: "4px",
                  }}
                />
                Produktet në aksion
              </div>
              <div className="pranues-home-latestproducts b-25 shadow-one">
                {discountedProducts && discountedProducts.length > 0 ? (
                  discountedProducts
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
                    })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    Nuk ka produkte në aksion
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default PranuesHomeView;
