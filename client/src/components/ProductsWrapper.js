import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import "@/styling/productswrapper.css";
import { Error, ProductionQuantityLimitsOutlined } from "@mui/icons-material";

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

  useEffect(() => {
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
          .map((product) => {
            return <ProductCard product={product} />;
          })
      )}
    </div>
  );
};

export default ProductsWrapper;
