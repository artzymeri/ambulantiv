import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersActiveItem";
import "@/styling/Pranues/ordersview.css";
import { Button } from "@mui/material";


const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const distributorCompanyName = localStorage.getItem("companyname");
    axios
      .get(
        `http://localhost:8080/getactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      });
  }, []);

  const downloadPDF = (data) => {
    // Create a Blob from the raw PDF data
    const blob = new Blob([data], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // Create an anchor element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'invoice.pdf'; // Set the filename for download
    link.style.display = 'none';
  
    // Append the anchor element to the body
    document.body.appendChild(link);
  
    // Simulate a click to trigger download
    link.click();
  
    // Clean up - remove the anchor and revoke the Blob URL after download
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const completeAllOrders = async () => {
    for (const order of ordersList) {
        try {
            const response = await axios.post(`http://localhost:8080/completeorder/${order.id}`, { order }, { responseType: 'blob' });

            const downloadLink = document.createElement('a');
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.setAttribute('download', `invoice_${order.id}.pdf`);
            downloadLink.click();
        } catch (error) {
            console.error(error);
        }
    }
};



 
  return (
    isClient && (
      <div className="orders-view-parent">
        <div className="orders-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë Aktive</h3>
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
                Nuk keni porosi aktive
              </p>
            </div>
          )}
        </div>
        {ordersList && ordersList.length > 0 ? (
          <Button
            variant="contained"
            color="warning"
            sx={{ height: 70 }}
            onClick={completeAllOrders}
          >
            Përfundo gjitha Porositë
          </Button>
        ) : null}
      </div>
    )
  );
};

export default OrdersView;
