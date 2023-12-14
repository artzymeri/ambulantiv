import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";

const OrderItem = (props) => {
  const {
    productName,
    productWeight,
    productPrice,
    productTotalPrice,
    productQuantity,
    productPhoto,
    productDistributor,
    productClient,
    createdAt,
  } = props.product;

  console.log(createdAt);

  const [isClient, setIsClient] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();

    setFormattedCreatedAt(formattedDate);
  }, []);

  return (
    isClient && (
      <div className="orders-row">
        <div className="orders-row-left">
          <div className="orders-row-left-l">
            <img src={productPhoto} />
          </div>
          <div className="orders-row-left-r">
            <h5>
              Emri i produktit:{" "}
              <span style={{ fontSize: "16px" }}> {productName} </span>
            </h5>
            <h5>
              Distributori:{" "}
              <span style={{ fontSize: "16px" }}> {productDistributor} </span>
            </h5>
          </div>
        </div>
        <div className="orders-row-right">
          <div className="orders-row-right-l">
            <h5>
              {productPrice}€ x {productQuantity} copë
            </h5>
            <h5>Totali: {productTotalPrice}</h5>
          </div>
          <div className="orders-row-right-r">
            <h5>{formattedCreatedAt}</h5>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderItem;
