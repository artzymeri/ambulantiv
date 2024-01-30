import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import {
  Add,
  Cancel,
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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const OrdersView = ({ updateStateInSideBar }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [ordersList, setOrdersList] = useState([]);

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [tempQuantities, setTempQuantities] = useState({});

  const [companyProducts, setCompanyProducts] = useState([]);

  const [listener, Trigger] = useState(1);

  const distributorCompanyName = localStorage.getItem("companyname");

  useEffect(() => {
    setIsClient(true);
    setLoading(true);
    axios
      .get(
        `https://ecommerce-kosova-server.onrender.com/getactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [listener]);

  const triggerUseEffect = () => {
    Trigger(listener + 1);
  };

  const completeAllOrders = () => {
    setLoading(true);
    for (const order of ordersList) {
      try {
        axios.post(
          `https://ecommerce-kosova-server.onrender.com/completeorder/${order.id}`,
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
        `https://ecommerce-kosova-server.onrender.com/getactiveordersfromdistributor/${distributorCompanyName}`
      )
      .then((res) => {
        setOrdersList(res.data);
      })
      .finally(() => {
        setLoading(false);
        Trigger(listener + 1);
        updateStateInSideBar(1);
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
    axios.post(
      `https://ecommerce-kosova-server.onrender.com/changeorder/${editedOrder.id}`,
      {
        editedOrder,
      }
    );
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
    isClient &&
    (!loading ? (
      <div className="orders-view-parent">
        <Dialog
          fullScreen={fullScreen}
          open={editOrderDialogOpen}
          onClose={() => {
            setEditOrderDialogOpen(false);
            setEditedOrder({ ...editedOrder, id: null, products: [] });
          }}
        >
          <DialogTitle
            borderBottom={"1px solid gray"}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h4>Edito Porosinë</h4>
            <Cancel
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditOrderDialogOpen(false);
                setEditedOrder({ ...editedOrder, id: null, products: [] });
              }}
            />
          </DialogTitle>
          <DialogContent
            style={{
              padding: "15px",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              background: "whitesmoke",
            }}
          >
            {editedOrder.products.map((product) => {
              return (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "60px",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center",
                    background: "white",
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
                        onClick={() => {
                          const newArray = editedOrder.products.filter(
                            (oldProducts) => {
                              return oldProducts.id !== product.id;
                            }
                          );
                          setEditedOrder({
                            ...editedOrder,
                            products: newArray,
                          });
                        }}
                        color="error"
                        variant="contained"
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
            <Button
              variant="contained"
              onClick={() => {
                setAddProductDialogOpen(true);
                axios
                  .get(
                    `https://ecommerce-kosova-server.onrender.com/getcompanyproducts/${localStorage.getItem(
                      "companyname"
                    )}`
                  )
                  .then((res) => {
                    setCompanyProducts(res.data);
                  });
              }}
            >
              Shto Produkt
            </Button>
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
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                axios.post(
                  `https://ecommerce-kosova-server.onrender.com/deleteorder/${editedOrder.id}`
                );
                setEditOrderDialogOpen(false);
                triggerUseEffect(listener + 1);
              }}
            >
              Fshi Porosinë
            </Button>
            <div
              style={{
                padding: "5px 20px",
                background: "whitesmoke",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px lightgray",
                border: "1px solid lightgray",
                fontWeight: "300",
              }}
            >
              Totali i Porosisë:{" "}
              <span style={{ fontWeight: "400" }}>
                {totalSumOfOrder.toFixed(2)}€
              </span>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                changeOrderFunction();
                axios
                  .get(
                    `https://ecommerce-kosova-server.onrender.com/getinactiveordersfromdistributor/${distributorCompanyName}`
                  )
                  .then((res) => {
                    setOrdersList(res.data);
                  });
              }}
            >
              Edito
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={addProductDialogOpen}
          onClose={() => {
            setAddProductDialogOpen(false);
          }}
        >
          <DialogTitle borderBottom={"1px solid gray"}>
            Selekto Produktin
          </DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              gap: "10px",
            }}
          >
            {companyProducts && companyProducts.length > 0 ? (
              companyProducts.map((product, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "whitesmoke",
                      alignItems: "center",
                      borderRadius: "13px",
                      border: "1px solid lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "80px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "50px",
                        paddingRight: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={product.photo}
                          style={{
                            height: "75%",
                            aspectRatio: "1 / 1",
                            marginLeft: "3px",
                            objectFit: "contain",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            justifyContent: "center",
                            gap: "10px",
                            color: "darkslategray",
                            marginLeft: "10px",
                          }}
                        >
                          <h4>{product.name}</h4>
                          <h4>{product.weight}</h4>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            alignItems: "center",
                          }}
                        >
                          <h5>{product.price}€</h5>
                          <h6>x</h6>
                          <input
                            type="number"
                            style={{ width: "70px" }}
                            value={tempQuantities[product.id] || ""}
                            onChange={(e) => {
                              setTempQuantities((prevQuantities) => ({
                                ...prevQuantities,
                                [product.id]: parseInt(e.target.value, 10),
                              }));
                            }}
                          />
                        </div>
                        <h3>=</h3>
                        <h3>{}€</h3> {/* this is formally put here */}
                        <Tooltip title="Klikoni për të shtuar produktin">
                          <Button
                            variant="contained"
                            style={{ minWidth: "30px" }}
                            onClick={() => {
                              const newQuantity =
                                tempQuantities[product.id] || 1;
                              const newTotalPrice = (
                                newQuantity * product.price
                              ).toFixed(2);

                              const newProduct = {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                weight: product.weight,
                                quantity: newQuantity,
                                discounted: product.discounted,
                                discountedPercentage:
                                  product.discountedPercentage,
                                totalPrice: newTotalPrice,
                              };
                              const oldOrder = ordersList.find((order) => {
                                return order.id == editedOrder.id;
                              });
                              const parsedProducts = JSON.parse(
                                oldOrder.products
                              );
                              parsedProducts.push(newProduct);
                              oldOrder.products =
                                JSON.stringify(parsedProducts);
                              setTempQuantities({});
                              setAddProductDialogOpen(false);
                              setEditOrderDialogOpen(false);
                              axios.post(
                                `https://ecommerce-kosova-server.onrender.com/changeorder/${oldOrder.id}`,
                                { editedOrder: oldOrder }
                              );
                            }}
                          >
                            <Add />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Nuk ka produkte kompania juaj!</p>
            )}
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
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setAddProductDialogOpen(false);
              }}
            >
              Mbyll
            </Button>
            <Button variant="contained">Shto Produktin</Button>
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
    ) : (
      <div className="loader-parent">
        <span className="loader"></span>
      </div>
    ))
  );
};

export default OrdersView;
