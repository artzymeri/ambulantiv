import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import "@/styling/productswrapper.css";
import { ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const ProductsWrapper = (props) => {
  const {
    searchQuery,
    allProducts,
    drinksProducts,
    fruitsandvegetablesProducts,
    foodProducts,
    housekeepProducts,
    hygeneProducts,
  } = props;

  const [productsData, setProductsData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [isClient, setIsClient] = useState(false);

  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem(`clientId:${localStorage.getItem('userId')}/cartProducts`)) || []
  );

  const activateSnackbar = () => {
    setSnackbarData({
      title: "success",
      message: "Produkti u shtua në shportë",
    });
    setSnackbarOpen(true);
  };

  const updateLocalStorage = (newArray) => {
    localStorage.setItem(
      `clientId:${localStorage.getItem('userId')}/cartProducts`,
      JSON.stringify(newArray)
    );
  };

  useEffect(() => {
    setIsClient(true);
    if (allProducts) {
      axios.get("http://localhost:8080/getlistedproducts").then((res) => {
        setProductsData(res.data);
      });
    } else if (drinksProducts) {
      axios.get("http://localhost:8080/getdrinksproducts").then((res) => {
        setProductsData(res.data);
      });
    } else if (fruitsandvegetablesProducts) {
      axios
        .get("http://localhost:8080/getfruitsandvegetablesproducts")
        .then((res) => {
          setProductsData(res.data);
        });
    } else if (foodProducts) {
      axios.get("http://localhost:8080/getfoodproducts").then((res) => {
        setProductsData(res.data);
      });
    } else if (housekeepProducts) {
      axios.get("http://localhost:8080/gethousekeepproducts").then((res) => {
        setProductsData(res.data);
      });
    } else if (hygeneProducts) {
      axios.get("http://localhost:8080/gethygeneproducts").then((res) => {
        setProductsData(res.data);
      });
    }
  }, []);

  const fileteredProducts = useMemo(() => {
    const loweredSearchQuery = searchQuery.toLowerCase();

    if (!searchQuery || searchQuery.length === 0) {
      return productsData;
    }

    return productsData.filter((product) => {
      return (
        product?.name.toLowerCase().includes(loweredSearchQuery) ||
        product?.price.toLowerCase().includes(loweredSearchQuery) ||
        product?.weight.toLowerCase().includes(loweredSearchQuery) ||
        product?.distributor.toLowerCase().includes(loweredSearchQuery)
      );
    });
  }, [searchQuery, productsData]);

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
        <div className="products-wrapper-parent">
          {fileteredProducts.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <ProductionQuantityLimitsOutlined sx={{ color: "gray" }} />
              <p style={{ color: "gray" }}>Asnjë produkt për tu shfaqur</p>
            </div>
          ) : (
            fileteredProducts
              .slice()
              .reverse()
              .map((product, index) => {
                return (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                    updateLocalStorage={updateLocalStorage}
                    activateSnackbar={activateSnackbar}
                  />
                );
              })
          )}
        </div>
      </>
    )
  );
};

export default ProductsWrapper;
