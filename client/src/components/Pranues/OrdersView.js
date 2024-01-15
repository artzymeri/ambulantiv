import React, { useEffect, useMemo, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersItem";
import "@/styling/Pranues/ordersview.css";
import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredOrders = useMemo(() => {
    if (startDate === null || endDate === null) {
      return ordersList;
    }

    return ordersList.filter((order) => {
      const orderDate = new Date(order.createdAt).getTime();
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();

      return orderDate >= startDateTime && orderDate <= endDateTime;
    });
  }, [startDate, endDate, ordersList]);

  const pranuesId = localStorage.getItem("userId");

  useEffect(() => {
    setIsClient(true);
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
      console.log(res.data);
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
        downloadLink.setAttribute(
          "download",
          `Fatura ${order.productName} ${order.createdAt}.pdf`
        );
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
        <div className="orders-view-navbar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="orders-view-items-wrapper">
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              return <OrderItem order={order} />;
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
        {filteredOrders && filteredOrders.length > 0 ? (
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
