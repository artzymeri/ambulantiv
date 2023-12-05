import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/distributorhomeview.css";
import axios from "axios";

const DistributorHomeView = () => {
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
        <div className="shadow-one b-5 home-welcome-div">{`Mirësevjen ${localStorage.getItem(
          "namesurname"
        )}`}</div>
        <div className="shadow-one b-5 home-children-products-number">
          {homeData && homeData.length < 1 ? (
            <>Ju unuk keni produkte të listuara akoma</>
          ) : (
            <>
              {homeData && homeData.length == 1 ? (
                <>Ju keni {homeData.length} produkt të listuar</>
              ) : (
                <>JU keni{homeData.length} produkte të listuara</>
              )}
            </>
          )}
        </div>
        <div className="shadow-one b-5 home-children">actions</div>
        <div className="shadow-one b-5 home-children">actions</div>
        <div className="shadow-one b-5 home-children">actions</div>
      </div>
    )
  );
};

export default DistributorHomeView;
