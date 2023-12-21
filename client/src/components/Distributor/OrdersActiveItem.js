import React, { useEffect, useState } from "react";
import "@/styling/Pranues/ordersitem.css";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Clear, Done, Download } from "@mui/icons-material";
import axios from "axios";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

const OrderItem = (props) => {
  const router = useRouter();

  const {
    id,
    productName,
    productWeight,
    productPrice,
    productTotalPrice,
    productQuantity,
    productPhoto,
    productDistributor,
    productClientName,
    createdAt,
  } = props.product;

  const [isClient, setIsClient] = useState(false);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleString();

    setFormattedCreatedAt(formattedDate);
  }, []);

  const generatePDF = () => {
    if (typeof window !== "undefined") {
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
        fileName: `Fatura ${productName} ${createdAt}.pdf`,
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
          name: `${productDistributor}`,
          address: "Adresa e Biznesit",
          phone: "(+383) 49 111 222",
          email: "distributor@gmail.com",
        },
        contact: {
          label: "Fatura lëshuar për:",
          name: `${productClientName}`,
          address: "Albania, Tirane, Astir",
          phone: "(+355) 069 22 22 222",
          email: "client@email.al",
        },
        invoice: {
          label: "Data e lëshimit",
          num: "",
          invGenDate: formatDateString(createdAt),
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
            id,
            productName,
            productDistributor,
            productPrice,
            productQuantity,
            productWeight,
            productTotalPrice,
          ]),
          additionalRows: [
            {
              col1: "Totali:",
              col2: productTotalPrice,
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
              col2: (parseFloat(productTotalPrice) * 0.8).toString(),
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
    }
  };

  const completeOrder = () => {
    try {
      axios
        .post(`http://localhost:8080/completeorder/${id}`)
        .then((res) => {
          const { title, message } = res.data;
          console.log(title, message);
        })
        .finally(() => {
          generatePDF();
        });
    } catch (error) {
      console.log(error);
    }
  };

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
              Klienti:{" "}
              <Tooltip title="Kliko për të shikuar produktet e kompanisë">
                <span
                  style={{
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {productClientName}
                </span>
              </Tooltip>
            </h5>
          </div>
        </div>
        <div className="orders-row-right">
          <div className="orders-row-right-l">
            <h5>
              {productPrice}€ x {productQuantity} pako
            </h5>
            <h5>
              Totali:{" "}
              <span style={{ fontSize: "16px" }}> {productTotalPrice}€ </span>
            </h5>
          </div>
          <div className="orders-row-right-r">
            <h5>{formattedCreatedAt}</h5>
          </div>
          <div className="orders-row-right-r">
            <Tooltip title="Përfundo porosinë">
              <Button
                onClick={completeOrder}
                variant="outlined"
                color="warning"
              >
                <Done />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderItem;
