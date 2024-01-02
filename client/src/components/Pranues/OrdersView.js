import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersItem";
import "@/styling/Pranues/ordersview.css";
import { Button } from "@mui/material";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  const pranuesId = localStorage.getItem("userId");

  useEffect(() => {
    setIsClient(true);
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
    });
  }, []);

  const generatePDFs = async () => {
    for (const order of ordersList) {
      try {
        const response = await axios.post(
          `http://localhost:8080/generatepdfonly/${order.id}`,
          { order },
          { responseType: "blob" }
        );

        const downloadLink = document.createElement("a");
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.setAttribute("download", `invoice_${order.id}.pdf`);
        downloadLink.click();
      } catch (error) {
        console.error(error);
      }
    }
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
    });
  };

  return (
    isClient && (
      <div className="orders-view-parent">
        <div className="orders-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë</h3>
        </div>
        <div className="orders-view-items-wrapper">
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order) => {
              return <OrderItem product={order} />;
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <p style={{ color: "gray", textDecoration: "italic" }}>
                Nuk keni bërë akoma porosi
              </p>
            </div>
          )}
        </div>
        {ordersList && ordersList.length > 0 ? (
          <Button
            variant="contained"
            color="warning"
            sx={{ height: 70 }}
            onClick={generatePDFs} //
          >
            Shkarko Faturat
          </Button>
        ) : null}
      </div>
    )
  );
};

export default OrdersView;
