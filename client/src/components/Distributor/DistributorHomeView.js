import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Distributor/distributorhomeview.css";
import axios from "axios";
import { useRouter } from "next/router";
import stateStorage from "@/store";

const DistributorHomeView = () => {
  const router = useRouter();

  const [homeData, setHomeData] = useState([]);

  const [discountedProducts, setDiscountedProducts] = useState([]);

  const [isClient, setIsClient] = useState(false);

  const [distributorActiveOrders, setDistributorActiveOrders] = useState([]);

  useEffect(() => {
    setIsClient(true);
    axios
      .get(
        `https://ecommerce-kosova-server.onrender.com/getlistedproducts/${localStorage.getItem(
          "companyname"
        )}`
      )
      .then((res) => {
        setHomeData(res.data);

        const discounted = res.data.filter((product) => product.discounted === true);

        setDiscountedProducts(discounted);
      });
    axios
      .get(
        `https://ecommerce-kosova-server.onrender.com/getactiveordersfromdistributor/${localStorage.getItem(
          "companyname"
        )}`
      )
      .then((res) => {
        setDistributorActiveOrders(res.data);
      });
  }, []);

  return (
    isClient && (
      <div className="distributor-home-parent">
        <div
          className="shadow-one b-25 home-children home-children-products-number"
          onClick={() => {
            router.push("/distributor/companyproducts");
          }}
        >
          {homeData && homeData.length < 1 ? (
            <h3>Ju nuk keni produkte të listuara akoma</h3>
          ) : (
            <>
              {homeData && homeData.length == 1 ? (
                <h3>
                  <span style={{ fontSize: "60px" }}>{homeData.length}</span>{" "}
                  produkt të listuar
                </h3>
              ) : (
                <h3>
                  Ju keni{" "}
                  <span style={{ fontSize: "60px" }}>{homeData.length}</span>{" "}
                  produkte të listuara
                </h3>
              )}
            </>
          )}
        </div>
        <div
          className="shadow-one b-25 home-children home-children-sale-products"
          onClick={() => {
            router.push("/distributor/companyproducts");
          }}
        >
          {discountedProducts && discountedProducts.length < 1 ? (
            <h3>Ju nuk keni produkte në aksion</h3>
          ) : (
            <>
              {discountedProducts && discountedProducts.length == 1 ? (
                <h3>
                  <span style={{ fontSize: "60px" }}>{discountedProducts.length}</span>{" "}
                  produkt në aksion
                </h3>
              ) : (
                <h3>
                  Ju keni{" "}
                  <span style={{ fontSize: "60px" }}>{discountedProducts.length}</span>{" "}
                  produkte në aksion
                </h3>
              )}
            </>
          )}
        </div>
        <div 
            onClick={() => {
            router.push("/distributor/orders");
          }} 
          className="shadow-one b-25 home-children home-children-orders">
          <h3>
            {distributorActiveOrders.length > 0 ? (
              <>
                <span style={{ fontSize: "60px" }}>
                  {distributorActiveOrders.length}
                </span>{" "}
                Porosi Aktive
              </>
            ) : (
              <>Nuk keni porosi aktive</>
            )}
          </h3>
        </div>
      </div>
    )
  );
};

export default DistributorHomeView;
