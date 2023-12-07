import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranueshome.css";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "../ProductCard";

const PranuesHomeView = () => {
  const [isClient, setIsClient] = useState(false);

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setIsClient(true);
    axios.get("http://localhost:8080/getlistedproducts").then((res) => {
      setProductsData(res.data);
    });
  }, []);

  return (
    isClient && (
      <div className="pranues-home-parent">
        <div className="pranues-home-latestproducts b-25 shadow-one">
          {productsData.slice().reverse().map((product) => {
            return (
              <ProductCard product={product} />
            );
          })}
        </div>
        <div className="pranues-home-child b-25 shadow-one"></div>
        <div className="pranues-home-child b-25 shadow-one"></div>
      </div>
    )
  );
};

export default PranuesHomeView;
