import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import axios from "axios";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
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
          <ShoppingBag sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Shporta</h3>
        </div>
        <div className="cart-view-items-wrapper"></div>
        {cartProductsList && cartProductsList.length > 0 ? (
          <Button
            variant="contained"
            color="success"
            className="cart-view-order-button"
            onClick={orderAll}
          >
            <LocalShipping />
            Porosit
          </Button>
        ) : null}
      </div>
    )
  );
};

export default OrdersView;
