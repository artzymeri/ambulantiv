import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import {
  Delete,
  LocalShipping,
  RemoveCircle,
  ShoppingBag,
} from "@mui/icons-material";
import axios from "axios";
import OrderActiveItem from "./OrdersActiveItem";
import "@/styling/Pranues/ordersview.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";

const OrdersView = ({ updateStateInSideBar }) => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  const [listener, Trigger] = useState(1);

  const distributorCompanyName = localStorage.getItem("companyname");

  useEffect(() => {
    setIsClient(true);
    axios
      .get(
        `http://localhost:8080/getactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      });
  }, [listener]);

  const triggerUseEffect = () => {
    Trigger(listener + 1);
  };

  const completeAllOrders = () => {
    for (const order of ordersList) {
      try {
        axios.post(
          `http://localhost:8080/completeorder/${order.id}`,
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
        `http://localhost:8080/getactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      });
    Trigger(listener + 1);
    updateStateInSideBar(1);
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
    const hasInvalidQuantity = editedOrder.products.some(
      (product) =>
        product.quantity == null ||
        product.quantity == "" ||
        isNaN(product.quantity)
    );

    const hasNegativeQuantity = editedOrder.products.some(
      (product) => product.quantity < 0
    );

    if (hasNegativeQuantity) {
      window.alert(
        "Ju lutem mos vendosni sasi negative tek sasia e produkteve"
      );
      return;
    }

    if (hasInvalidQuantity) {
      window.alert(
        "Ju lutem mbushni rubrikat e zbrazura të sasive të produktit"
      );
      return;
    }
    axios.post(`http://localhost:8080/changeorder/${editedOrder.id}`, {
      editedOrder,
    });
    setEditOrderDialogOpen(false);
    triggerUseEffect();
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
                    height: "45px",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center",
                    background: "whitesmoke",
                    border: "1px solid lightgray",
                    padding: "0px 10px",
                    borderRadius: "5px",
                    flexShrink: "0",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{product.name}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
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
                    <Tooltip title="Klikoni për të fshirë porosinë">
                      <Button
                        color="error"
                        variant="outlined"
                        style={{
                          padding: "3px",
                          minWidth: "40px",
                          marginLeft: "10px",
                        }}
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
                  </div>
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
          <h3 style={{ color: "rgb(130, 30, 30)" }}>Porositë Aktive</h3>
        </div>
        <div className="orders-view-items-wrapper">
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order) => {
              return (
                <OrderActiveItem
                  key={order.id}
                  order={order}
                  editOrderDialog={editOrderDialog}
                  triggerUseEffect={triggerUseEffect}
                  updateStateInSideBar={updateStateInSideBar}
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
                Nuk keni porosi aktive
              </p>
            </div>
          )}
        </div>
        {ordersList && ordersList.length > 0 ? (
          <Button
            variant="contained"
            color="warning"
            sx={{ height: 70, flexShrink: "0" }}
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
