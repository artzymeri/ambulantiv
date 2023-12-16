import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersItem";
import "@/styling/Pranues/ordersview.css";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const pranuesId = localStorage.getItem("userId");
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    isClient && (
      <div className="orders-view-parent">
        <div className="orders-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë</h3>
        </div>
        <div className="orders-view-items-wrapper">
          {ordersList && ordersList.length > 0
            ? ordersList.map((order) => {
                return <OrderItem product={order} />;
              })
            : null}
        </div>
      </div>
    )
  );
};

export default OrdersView;
