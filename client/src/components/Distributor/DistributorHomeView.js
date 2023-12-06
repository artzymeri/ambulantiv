import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/distributorhomeview.css";
import axios from "axios";
import { useRouter } from "next/router";

const DistributorHomeView = () => {
  const router = useRouter();

  const [homeData, setHomeData] = useState([]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    axios
      .get(
        `http://localhost:8080/getlistedproducts/${localStorage.getItem(
          "companyname"
        )}`
      )
      .then((res) => {
        setHomeData(res.data);
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
            <h3>Ju unuk keni produkte të listuara akoma</h3>
          ) : (
            <>
              {homeData && homeData.length == 1 ? (
                <h3>
                  <span style={{ fontSize: "60px" }}>{homeData.length}</span>{" "}
                  produkt të listuar
                </h3>
              ) : (
                <>JU keni{homeData.length} produkte të listuara</>
              )}
            </>
          )}
        </div>
        <div
          className="shadow-one b-25 home-children home-children-clients"
          onClick={() => {
            router.push("/distributor/clients");
          }}
        >
          <h3>
            <span style={{ fontSize: "60px" }}>32</span> klientë aktivë
          </h3>
        </div>
        <div
          className="shadow-one b-25 home-children home-children-sale-products"
          onClick={() => {
            router.push("/distributor/companyproducts");
          }}
        >
          <h3>
            <span style={{ fontSize: "60px" }}>1</span> produkt në aksion
          </h3>
        </div>
        <div className="shadow-one b-25 home-children home-children-orders">
          <h3>
            <span style={{ fontSize: "60px" }}>12</span> porosi aktive
          </h3>
        </div>
      </div>
    )
  );
};

export default DistributorHomeView;
