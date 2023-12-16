import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import DistributorChecker from "@/components/Checkers/DistributorChecker";
import DistributorSideBar from "@/components/Distributor/DistributorSideBar";
import TableComponent from "@/components/TableComponent";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { Menu } from "@mui/icons-material";
import axios from "axios";
import "@/styling/global.css";
import EditProductDialog from "@/components/EditProductDialog";
import Head from "next/head";

const CompanyListedProducts = () => {
  const [isClient, setIsClient] = useState(false);

  const [loading, setLoading] = useState(true);

  const [refreshRate, setRefreshRate] = useState(1);

  const refreshListedProductsTable = () => {
    setRefreshRate(refreshRate + 1);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [searchInput, setSearchInput] = useState("");

  const [listedCompanyProductsData, setListedCompanyProductsData] = useState(
    []
  );

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/getlistedproducts/${localStorage.getItem(
          "companyname"
        )}`
      )
      .then((res) => {
        setListedCompanyProductsData(res.data);
        setLoading(false);
        setIsClient(true);
      });
  }, [refreshRate]);

  const rows = listedCompanyProductsData;

  const [display, setDisplay] = useState("none");

  const [openDialog, setOpenDialog] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: null,
    category: null,
    price: null,
    weight: null,
    distributor: null,
    photo: null,
    outOfStock: null,
  });

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  const handleOpenDialog = (product) => {
    setOpenDialog(true);
    setEditedProduct({
      id: product.id,
      category: product.category,
      name: product.name,
      price: product.price,
      weight: product.weight,
      distributor: product.distributor,
      photo: product.photo,
      outOfStock: product.outOfStock,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      id: 1,
      name: "Emri i Produktit",
    },
    {
      id: 2,
      name: "Kategoria",
    },
    {
      id: 3,
      name: "Çmimi",
    },
    {
      id: 4,
      name: "Pesha",
    },
    {
      id: 5,
      name: "Foto e produktit",
    },
    {
      id: 7,
      name: "Butonat",
    },
  ];
  return (
    isClient && (
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
          <title>Produktet e kompanisë</title>
        </Head>
        <AuthenticatorChecker>
          <DistributorChecker>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity={snackbarData.title.toLowerCase()}
              >
                {snackbarData.message}
              </MuiAlert>
            </Snackbar>
            <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
              <EditProductDialog
                openDialog={openDialog}
                editedProductData={editedProduct}
                handleCloseDialog={handleCloseDialog}
                refreshListedProductsTable={refreshListedProductsTable}
              />
              <DistributorSideBar
                display={display}
                closeSidebar={closeSidebar}
              />
              <div
                style={{
                  display: "flex",
                  padding: "30px",
                  flexDirection: "column",
                  gap: "15px",
                  flexGrow: 1,
                  overflowX: "clip",
                }}
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Kërko llogaritë"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "25px",
                    border: "1px solid black",
                    paddingLeft: "15px",
                  }}
                  className="shadow-one"
                />
                <TableComponent
                  columns={columns}
                  rows={rows}
                  searchInput={searchInput}
                  companyProductButtons={true}
                  handleOpenDialog={handleOpenDialog}
                  refreshRate={refreshRate}
                  companyProductsList={true}
                />
                <button
                  className="sidebar-distributor-trigger-button shadow-one"
                  onClick={openSidebar}
                >
                  <Menu style={{ color: "white" }} />
                </button>
              </div>
            </div>
          </DistributorChecker>
        </AuthenticatorChecker>
      </>
    )
  );
};

export default CompanyListedProducts;
