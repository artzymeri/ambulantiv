import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

import {
  Clear,
  Done,
  Download,
  DownloadOutlined,
  Edit,
  Print,
} from "@mui/icons-material";
import axios from "axios";

const OrderInActiveItem = (props) => {
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

  const { editOrderDialog } = props;

  const [isClient, setIsClient] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();
    setFormattedCreatedAt(formattedDate);
  }, []);

  const generatePDF = async (order) => {
    const dateObject = new Date(order.createdAt);
    const formattedDate = dateObject.toLocaleString();
    try {
      const response = await axios.post(
        `https://ecommerce-kosova-server.onrender.com/generatepdfonly/${order.id}`,
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
                  editOrderDialog(id, JSON.parse(products));
                }}
                variant="outlined"
                color="warning"
              >
                <Edit />
              </Button>
            </Tooltip>
            <Tooltip title="Shkarko faturën e porosisë">
              <Button
                onClick={() => {
                  generatePDF(props.order);
                }}
                variant="contained"
                color="warning"
              >
                <Download />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderInActiveItem;
