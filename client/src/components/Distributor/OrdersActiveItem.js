import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Clear, Done, Download, Edit } from "@mui/icons-material";
import axios from "axios";
import { set } from "mobx";

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

  const { triggerUseEffect, updateStateInSideBar, editOrderDialog } = props;

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();
    setFormattedCreatedAt(formattedDate);
  }, []);

  const completeOrder = async (order) => {
    const dateObject = new Date(order.createdAt);
    const formattedDate = dateObject.toLocaleString();
    try {
      setLoading(true);
      axios
        .post(
          `https://ecommerce-kosova-server.onrender.com/completeorder/${order.id}`,
          { order },
          { responseType: "blob" }
        )
        .then((response) => {
          const downloadLink = document.createElement("a");
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);

          downloadLink.href = url;
          downloadLink.setAttribute(
            "download",
            `Fatura ${order.clientCompanyname} ${order.distributorCompanyName} ${formattedDate}.pdf`
          );
          downloadLink.click();
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const totalPriceOfOrder = (productsArray) => {
    let totalSum = 0;
    for (const product of productsArray) {
      totalSum = totalSum + parseFloat(product.totalPrice);
    }
    return totalSum.toFixed(2);
  };

  return (
    isClient && (
      <div className="orders-row">
        <div className="orders-row-left">
          <h5>Klienti: {clientCompanyname}</h5>
          <h5>{clientCompanyAddress}</h5>
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
            <Tooltip title="Edito porosinë">
              <Button
                onClick={() => {
                  editOrderDialog(
                    props.order.id,
                    JSON.parse(props.order.products)
                  );
                }}
                variant="outlined"
                color="warning"
              >
                <Edit />
              </Button>
            </Tooltip>
            <Tooltip title="Përfundo porosinë">
              {loading ? (
                <div className="loader-parent">
                  <span className="loader"></span>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    completeOrder(props.order);
                    triggerUseEffect();
                    updateStateInSideBar(1);
                  }}
                  variant="contained"
                  color="warning"
                >
                  <Done />
                </Button>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderActiveItem;
