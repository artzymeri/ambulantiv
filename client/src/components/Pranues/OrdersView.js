import React, { useEffect, useMemo, useState } from "react";
import "@/styling/Pranues/cartview.css";
import {
  LocalShipping,
  Refresh,
  RemoveCircle,
  ShoppingBag,
} from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersItem";
import "@/styling/Pranues/ordersview.css";
import { Button, MenuItem, TextField, Tooltip } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);
  const [distributorsList, setDistributorsList] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [distributorCompanyName, setDistributorCompanyName] = useState(null);

  const filteredOrders = useMemo(() => {
    if (
      startDate === null &&
      endDate === null &&
      distributorCompanyName === null
    ) {
      return ordersList;
    }
  
    return ordersList.filter((order) => {
      const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0);
      const startDateTime = startDate
        ? new Date(startDate).setHours(0, 0, 0, 0)
        : null;
      const endDateTime = endDate
        ? new Date(endDate).setHours(23, 59, 59, 999)
        : null;
  
      const matchesDateRange =
        (startDateTime === null || orderDate >= startDateTime) &&
        (endDateTime === null || orderDate <= endDateTime);
  
      const matchesDistributor =
        distributorCompanyName === null ||
        order.distributorCompanyName === distributorCompanyName;
  
      return matchesDateRange && matchesDistributor;
    });
  }, [startDate, endDate, distributorCompanyName, ordersList]);
  

  const pranuesId = localStorage.getItem("userId");

  useEffect(() => {
    setIsClient(true);
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
    });
    axios.get("http://localhost:8080/getdistributors").then((res) => {
      setDistributorsList(res.data);
    });
  }, [startDate, endDate]);

  const generatePDFs = async () => {
    for (const order of ordersList) {
      const dateObject = new Date(order.createdAt);
      const formattedDate = dateObject.toLocaleString();
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
          `Fatura ${order.clientCompanyname} ${order.distributorCompanyName} ${formattedDate}.pdf`
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

  const groupOrdersByDate = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(order);
    });
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByDate(filteredOrders);

  return (
    isClient && (
      <div className="orders-view-parent">
        <div className="orders-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë</h3>
        </div>
        <div className="orders-view-navbar" style={{ borderTop: "0px" }}>
          <TextField
            select
            label="Distributori"
            style={{ width: "200px" }}
            value={distributorCompanyName}
            onChange={(e) => {
              setDistributorCompanyName(e.target.value);
            }}
          >
            {distributorsList.map((distributor, index) => (
              <MenuItem key={index} value={distributor.companyname}>
                {distributor.companyname}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data Fillestare"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data Përfundimtare"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Tooltip title="Kalkulo Bonusin Vjetor">
            <Button
              disabled={startDate == null || endDate == null}
              variant="contained"
              style={{ height: "56px" }}
            >
              Bonusi Vjetor
            </Button>
          </Tooltip>
          {(startDate !== null ||
            endDate !== null ||
            distributorCompanyName !== null) && (
            <Tooltip title="Rikthe filtrat në origjinë">
              <Button
                variant="outlined"
                style={{ height: "56px" }}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setDistributorCompanyName(null);
                }}
              >
                <Refresh />
              </Button>
            </Tooltip>
          )}
        </div>
        <div className="orders-view-items-wrapper">
          {Object.entries(groupedOrders).map(([date, orders]) => (
            <div key={date}>
              <h5 style={{ marginBottom: "7px", marginTop: '3px', width: '100%', textAlign: 'center', background: 'white', padding: '10px', border: '1px solid lightgray' }}>{date}</h5>
              {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          ))}
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
