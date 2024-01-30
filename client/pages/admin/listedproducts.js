import React, { Suspense, useEffect, useState } from "react";
import "@/styling/global.css";
import axios from "axios";
import { Menu } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import Head from "next/head";
import dynamic from "next/dynamic";

const AdminSideBar = dynamic(() => import("@/components/Admin/AdminSideBar"), {
  ssr: false,
});

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  {
    ssr: false,
  }
);

const TableComponent = dynamic(() => import("@/components/TableComponent"), {
  ssr: false,
});

const AdminChecker = dynamic(
  () => import("@/components/Checkers/AdminChecker"),
  {
    ssr: false,
  }
);

const EditProductDialog = dynamic(
  () => import("@/components/EditProductDialog"),
  {
    ssr: false,
  }
);

const ListedProducts = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const [listedProductsData, setListedProductsData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [refreshRate, setRefreshRate] = useState(1);

  const refreshListedProductsTable = () => {
    setRefreshRate(refreshRate + 1);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ecommerce-kosova-server.onrender.com/getlistedproducts")
      .then((res) => {
        setListedProductsData(res.data);
        setIsClient(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshRate]);

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
      id: 6,
      name: "Distributori",
    },
    {
      id: 7,
      name: "Butonat",
    },
  ];

  const rows = listedProductsData;

  const [searchInput, setSearchInput] = useState("");

  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  const deleteProduct = (product) => {
    axios
      .post(
        `https://ecommerce-kosova-server.onrender.com/deleteproduct/${product.id}`
      )
      .then((res) => {
        const { title, message } = res.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
        setLoading(true);
        axios
          .get("https://ecommerce-kosova-server.onrender.com/getlistedproducts")
          .then((res) => {
            setListedProductsData(res.data);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: null,
    category: null,
    price: null,
    weight: null,
    distributor: null,
    photo: null,
    outOfStock: null,
    discounted: null,
    discountedPercentage: null,
  });

  const handleOpenDialog = (product) => {
    setOpenDialog(true);
    setEditedProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      weight: product.weight,
      distributor: product.distributor,
      photo: product.photo,
      outOfStock: product.outOfStock,
      discounted: product.discounted,
      discountedPercentage: product.discountedPercentage,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    isClient && (
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
          <title>Produktet e listuara</title>
        </Head>
        <AuthenticatorChecker>
          <AdminChecker>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1500}
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
            <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
              <AdminSideBar display={display} closeSidebar={closeSidebar} />
              {loading ? (
                <div className="loader-parent">
                  <span className="loader"></span>
                </div>
              ) : (
                <>
                  <EditProductDialog
                    openDialog={openDialog}
                    editedProductData={editedProduct}
                    handleCloseDialog={handleCloseDialog}
                    refreshListedProductsTable={refreshListedProductsTable}
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
                        productButtons={true}
                        deleteProduct={deleteProduct}
                        handleOpenDialog={handleOpenDialog}
                        productsList={true}
                        refreshRate={refreshRate}
                      />
                    <button
                      className="sidebar-trigger-button shadow-one"
                      onClick={openSidebar}
                    >
                      <Menu style={{ color: "white" }} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </AdminChecker>
        </AuthenticatorChecker>
      </>
    )
  );
};

export default ListedProducts;
