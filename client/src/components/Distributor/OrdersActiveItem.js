import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Clear, Done, Download } from "@mui/icons-material";
import axios from "axios";

const OrderActiveItem = (props) => {
  const router = useRouter();

  const {
    id,
    clientId,
    clientName,
    clientCompanyname,
    clientCompanyAddress,
    distributorCompanyName,
    distributorCompanyAddress,
    products,
    createdAt,
  } = props.order;

  const { triggerUseEffect, updateStateInSideBar } = props;

  const [isClient, setIsClient] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();

    setFormattedCreatedAt(formattedDate);
  }, []);

  const completeOrder = async (order) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/completeorder/${order.id}`,
        { order },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `Fatura ${order.productName} ${order.createdAt}.pdf`
      );
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
    triggerUseEffect();
    updateStateInSideBar(1);
  };

  const totalPriceOfOrder = (productsArray) => {
    let totalSum = 0;
    for (const product of productsArray) {
      totalSum = totalSum + parseFloat(product.totalPrice);
      console.log(parseFloat(product.totalPrice));
    }
    return totalSum.toFixed(2);
  };

  return (
    isClient && (
      <div className="orders-row">
        <div className="orders-row-left">
          <div className="orders-row-left-r">
            <h5>
              Klienti:{" "}
              <span
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {clientCompanyname}
              </span>
            </h5>
          </div>
        </div>
        <div className="orders-row-right">
          <div className="orders-row-right-l">
            <h5>
              Totali:{" "}
              <span style={{ fontSize: "16px" }}>
                {" "}
                {totalPriceOfOrder(JSON.parse(products))}€{" "}
              </span>
            </h5>
          </div>
          <div className="orders-row-right-r">
            <h5>{formattedCreatedAt}</h5>
          </div>
          <div className="orders-row-right-r">
            <Tooltip title="Përfundo porosinë">
              <Button
                // onClick={() => {
                //   completeOrder(props.product);
                // }}
                variant="outlined"
                color="warning"
              >
                <Done />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderActiveItem;
