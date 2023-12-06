import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranueshome.css";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
          {productsData.map((product) => {
            return (
              <div className="pranues-home-latestproducts-child shadow-one">
                <img src={product.photo} />
                <div className="pranues-home-latestproducts-child-text">
                  <div className="pranues-home-latestproducts-child-text-up">
                    <h4>{product.name}</h4>
                    <span style={{ fontSize: "25px" }}>{product.price}€</span>
                  </div>
                  <button>
                    Shto në shportë <ShoppingCartIcon sx={{ height: "20px" }} />
                  </button>
                </div>
              </div>
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
