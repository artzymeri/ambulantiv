import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranueshome.css";
import axios from "axios";

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
