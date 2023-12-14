import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import axios from "axios";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const pranuesCompanyName = localStorage.getItem("companyname");
    axios
      .get(`http://localhost:8080/getorders/${pranuesCompanyName}`)
      .then((res) => {
        setOrdersList(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    isClient && (
      <div className="cart-view-parent">
        <div className="cart-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë</h3>
        </div>
        <div className="cart-view-items-wrapper">
          {ordersList && ordersList.length > 0
            ? ordersList.map((order) => {
                return (
                  <div className="order-history-row">
                    <div className="order-history-row-left">
                      <div className="order-history-row-left-l">
                        <img src={order.productPhoto} />
                      </div>
                      <div className="order-history-row-left-r">
                        <h5>{order.productName}</h5>
                        <h5>{order.productDistributor}</h5>
                      </div>
                    </div>
                    <div className="order-history-row-right">
                      <div className="order-history-row-right-l">
                        <h5>
                          {order.productPrice} x {order.productQuantity}
                        </h5>
                        <h5>Totali: {order.productTotalPrice}</h5>
                      </div>
                      <div className="order-history-row-right-r">
                        <h5>{order.createdAt}</h5>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    )
  );
};

export default OrdersView;
