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
    companyname,
  } = props;

  const companynameForServer = companyname?.companyname;

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

  const [loading, setLoading] = useState(false);

  const [cartProducts, setCartProducts] = useState(
    JSON.parse(
      localStorage.getItem(
        `clientId:${localStorage.getItem("userId")}/cartProducts`
      )
    ) || []
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
      `clientId:${localStorage.getItem("userId")}/cartProducts`,
      JSON.stringify(newArray)
    );
  };

  useEffect(() => {
    setIsClient(true);
    setLoading(true);
    if (allProducts) {
      axios
        .get("https://ecommerce-kosova-server.onrender.com/getlistedproducts")
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (drinksProducts) {
      axios
        .get("https://ecommerce-kosova-server.onrender.com/getdrinksproducts")
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (fruitsandvegetablesProducts) {
      axios
        .get(
          "https://ecommerce-kosova-server.onrender.com/getfruitsandvegetablesproducts"
        )
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (foodProducts) {
      axios
        .get("https://ecommerce-kosova-server.onrender.com/getfoodproducts")
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (housekeepProducts) {
      axios
        .get(
          "https://ecommerce-kosova-server.onrender.com/gethousekeepproducts"
        )
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (hygeneProducts) {
      axios
        .get("https://ecommerce-kosova-server.onrender.com/gethygeneproducts")
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (companyname) {
      axios
        .get(
          `https://ecommerce-kosova-server.onrender.com/getcompanyproducts/${companynameForServer}`
        )
        .then((res) => {
          setProductsData(res.data);
        })
        .finally(() => {
          setLoading(false);
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
    isClient &&
    (loading ? (
      <div className="loader-parent" style={{ marginTop: "100px" }}>
        <span className="loader"></span>
      </div>
    ) : (
      <>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
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
    ))
  );
};

export default ProductsWrapper;
