import React, { useEffect, useState } from "react";
import "@/styling/Pranues/cartview.css";
import { LocalShipping, RemoveCircle, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import OrderItem from "./OrdersItem";
import "@/styling/Pranues/ordersview.css";
import { Button } from "@mui/material";
import { OutputType } from "jspdf-invoice-template";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";

const OrdersView = () => {
  const [isClient, setIsClient] = useState(false);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const pranuesId = localStorage.getItem("userId");
    axios.get(`http://localhost:8080/getorders/${pranuesId}`).then((res) => {
      setOrdersList(res.data);
    });
  }, []);

  const generatePDFs = () => {
    for (const order of ordersList) {
      function formatDateString(dateString) {
        const dateObject = new Date(dateString);

        const formattedDate = dateObject.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        return formattedDate;
      }
      var props = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: `Fatura ${order.productName} ${order.createdAt}.pdf`,
        orientationLandscape: false,
        compress: true,
        logo: {
          src: "/logoPdf.png",
          type: "PNG", //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 53.33,
          margin: {
            top: -10, //negative or positive num, from the current position
            left: 0,
          },
        },
        // stamp: {
        //   inAllPages: true, //by default = false, just in the last page
        //   src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        //   type: "JPG", //optional, when src= data:uri (nodejs case)
        //   width: 20, //aspect ratio = width/height
        //   height: 20,
        //   margin: {
        //     top: 0, //negative or positive num, from the current position
        //     left: 0, //negative or positive num, from the current position
        //   },
        // },
        business: {
          name: `${order.productDistributor}`,
          address: "Adresa e Biznesit",
          phone: "(+383) 49 111 222",
          email: "distributor@gmail.com",
        },
        contact: {
          label: "Fatura lëshuar për:",
          name: `${order.productClient}`,
          address: "Albania, Tirane, Astir",
          phone: "(+355) 069 22 22 222",
          email: "client@email.al",
        },
        invoice: {
          label: "Data e lëshimit",
          num: "",
          invGenDate: formatDateString(order.createdAt),
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 8,
              },
            },
            {
              title: "Emri i produktit",
              style: {
                width: 40,
              },
            },
            {
              title: "Distributori",
              style: {
                width: 30,
              },
            },
            { title: "Çmimi" },
            { title: "Sasia" },
            { title: "Pesha" },
            { title: "Totali" },
          ],
          table: Array.from(Array(1), (item, index) => [
            order.id,
            order.productName,
            order.productDistributor,
            order.productPrice,
            order.productQuantity,
            order.productWeight,
            order.productTotalPrice,
          ]),
          additionalRows: [
            {
              col1: "Totali:",
              col2: order.productTotalPrice,
              col3: "EURO",
              style: {
                fontSize: 14, //optional, default 12
              },
            },
            {
              col1: "VAT:",
              col2: "20",
              col3: "%",
              style: {
                fontSize: 10, //optional, default 12
              },
            },
            {
              col1: "SubTotali:",
              col2: (parseFloat(order.productTotalPrice) * 0.8).toString(),
              col3: "EURO",
              style: {
                fontSize: 10, //optional, default 12
              },
            },
          ],
        },
        footer: {
          text: "Fatura përdoret vetëm nga personat konkretë të përfshirë në marrëveshje.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };
      const pdfObject = jsPDFInvoiceTemplate(props);
      console.log(order);
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
                Nuk keni bërë akoma porosi
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
            Shkarko Faturat
          </Button>
        ) : null}
      </div>
    )
  );
};

export default OrdersView;
