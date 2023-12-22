import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Download } from "@mui/icons-material";


const OrderItem = (props) => {
  const router = useRouter();

  const {
    id,
    productName,
    productWeight,
    productPrice,
    productTotalPrice,
    productQuantity,
    productPhoto,
    productDistributor,
    productClientId,
    productClientName,
    createdAt,
  } = props.product;

  const [isClient, setIsClient] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();

    setFormattedCreatedAt(formattedDate);
  }, []);


  return (
    isClient && (
      <div className="orders-row">
        <div className="orders-row-left">
          <div className="orders-row-left-l">
            <img src={productPhoto} />
          </div>
          <div className="orders-row-left-r">
            <h5>
              Emri i produktit:{" "}
              <span style={{ fontSize: "16px" }}> {productName} </span>
            </h5>
            <h5>
              Distributori:{" "}
              <Tooltip title="Kliko për të shikuar produktet e kompanisë">
                <span
                  onClick={() => {
                    router.push({
                      pathname: "/pranues/products/company",
                      query: {
                        companyname: productDistributor,
                      },
                    });
                  }}
                  style={{
                    fontSize: "16px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {productDistributor}
                </span>
              </Tooltip>
            </h5>
          </div>
        </div>
        <div className="orders-row-right">
          <div className="orders-row-right-l">
            <h5>
              {productPrice}€ x {productQuantity} pako
            </h5>
            <h5>
              Totali:{" "}
              <span style={{ fontSize: "16px" }}> {productTotalPrice}€ </span>
            </h5>
          </div>
          <div className="orders-row-right-r">
            <h5>{formattedCreatedAt}</h5>
          </div>
          <div className="orders-row-right-r">
            <Tooltip title="Shkarko faturën për porosinë">
              <Button onClick={generatePDF} variant="outlined" color="warning">
                <Download />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderItem;
