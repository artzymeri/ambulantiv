import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderInActiveItem from "./OrdersInActiveItem";
import "@/styling/Pranues/ordersview.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  const distributorCompanyName = localStorage.getItem("companyname");

  useEffect(() => {
    setIsClient(true);
    axios
      .get(
        `http://localhost:8080/getinactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
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
    axios
      .get(
        `http://localhost:8080/getinactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      });
  };

  const [editedOrder, setEditedOrder] = useState({
    id: null,
    products: [],
  });

  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);

  const editOrderDialog = (id, products) => {
    setEditedOrder({ ...editedOrder, id: id, products: products });
    setEditOrderDialogOpen(true);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = editedOrder.products.map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: newQuantity,
            totalPrice: (newQuantity * product.price).toFixed(2),
          }
        : product
    );
    setEditedOrder({ ...editedOrder, products: updatedProducts });
  };

  const changeOrderFunction = () => {
    axios.post(`http://localhost:8080/changeorder/${editedOrder.id}`, {
      editedOrder,
    });
    setEditOrderDialogOpen(false);
  };

  const [totalSumOfOrder, setTotalSumOfOrder] = useState(0);

  useEffect(() => {
    let totalSum = 0;
    for (const product of editedOrder.products) {
      totalSum = totalSum + parseFloat(product.totalPrice);
    }
    setTotalSumOfOrder(totalSum);
  }, [editedOrder]);

  return (
    isClient && (
      <div className="orders-view-parent">
        <Dialog
          open={editOrderDialogOpen}
          onClose={() => {
            setEditOrderDialogOpen(false);
            setEditedOrder({ ...editedOrder, id: null, products: [] });
          }}
        >
          <DialogTitle borderBottom={"1px solid gray"}>
            Edito Porosinë
          </DialogTitle>
          <DialogContent
            style={{
              padding: "15px",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {editedOrder.products.map((product) => {
              return (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: "10px",
                    height: "45px",
                    alignItems: "center",
                    background: "whitesmoke",
                    border: "1px solid lightgray",
                    padding: "0px 10px",
                    borderRadius: "5px",
                    flexShrink: "0",
                  }}
                >
                  <p>{product.name}</p>
                  <p>{product.price}€</p>
                  <p>x</p>
                  <input
                    type="number"
                    style={{ width: "50px", textAlign: "center" }}
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <p>=</p>
                  <p>{product.totalPrice}€</p>
                </div>
              );
            })}
          </DialogContent>
          <DialogActions
            style={{
              border: "1px solid gray",
              borderBottom: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined">Mbyll</Button>
            <div>Totali i Porosisë: {totalSumOfOrder.toFixed(2)}€ </div>
            <Button variant="contained" onClick={changeOrderFunction}>
              Edito
            </Button>
          </DialogActions>
        </Dialog>
        <div className="orders-view-navbar">
          <LocalShipping sx={{ color: "rgb(130, 30, 30)" }} />
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Historiku i Porosive</h3>
        </div>
        <div className="orders-view-items-wrapper">
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order) => {
              return (
                <OrderInActiveItem
                  product={order}
                  editOrderDialog={editOrderDialog}
                />
              );
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
                Nuk keni histori të porosive
              </p>
            </div>
          )}
        </div>
        {ordersList && ordersList.length > 0 ? (
          <Button
            variant="contained"
            color="warning"
            sx={{ height: 70 }}
            onClick={generatePDFs}
          >
            Shkarko Gjitha Faturat
          </Button>
        ) : null}
      </div>
    )
  );
};

export default OrdersView;
