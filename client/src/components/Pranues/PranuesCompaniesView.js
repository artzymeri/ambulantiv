import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranuescompanies.css";
import axios from "axios";
import { Storage } from "@mui/icons-material";
import { useRouter } from "next/router";

const PranuesCompaniesView = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const [distributorsList, setDistributorsList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setIsClient(true);
    axios
      .get("https://ecommerce-kosova-server.onrender.com/getdistributors")
      .then((res) => {
        setDistributorsList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    isClient &&
    (loading ? (
      <div className="loader-parent">
        <span className="loader"></span>
      </div>
    ) : (
      <>
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
            <Storage sx={{ marginBottom: "2px" }} />
            Kompanitë
          </div>
          <div className="pranues-companies-parent">
            {distributorsList && distributorsList.length > 0
              ? distributorsList.map((distributor, index) => {
                  return (
                    <div
                      key={index}
                      className="pranues-companies-item"
                      onClick={() => {
                        router.push({
                          pathname: "/pranues/products/company",
                          query: {
                            companyname: distributor.companyname,
                          },
                        });
                      }}
                    >
                      {distributor.companyLogo &&
                      distributor.companyLogo.length > 4 ? (
                        <img src={distributor.companyLogo} />
                      ) : (
                        <h3 style={{ color: "darkslategray" }}>
                          {distributor.companyname}
                        </h3>
                      )}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </>
    ))
  );
};

export default PranuesCompaniesView;
