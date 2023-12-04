import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import axios from "axios";
import TableComponent from "@/components/TableComponent";
import { Menu } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import AdminChecker from "@/components/AdminChecker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditProductDialog from "@/components/EditProductDialog";

const ListedProducts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [listedProductsData, setListedProductsData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/getlistedproducts").then((res) => {
      setListedProductsData(res.data);
      setLoading(false);
      setIsClient(true);
    });
  }, []);

  const [isClient, setIsClient] = useState(false);

  const columns = [
    {
      id: 1,
      name: "Emri i Produktit",
    },
    {
      id: 2,
      name: "Çmimi",
    },
    {
      id: 3,
      name: "Pesha",
    },
    {
      id: 4,
      name: "Distributori",
    },
    {
      id: 5,
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
      .post(`http://localhost:8080/deleteproduct/${product.id}`)
      .then((res) => {
        const { title, message } = res.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
        setLoading(true);
        axios.get("http://localhost:8080/getlistedproducts").then((res) => {
          setListedProductsData(res.data);
          setIsClient(true);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: null,
    price: null,
    weight: null,
    distributor: null,
    photo: null,
  });

  const handleOpenDialog = (product) => {
    setOpenDialog(true);
    setEditedProduct({
      name: product.name,
      price: product.price,
      weight: product.weight,
      distributor: product.distributor,
      photo: product.photo,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    isClient && (
      <AuthenticatorChecker>
        <AdminChecker>
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
            />
            <AdminSideBar display={display} closeSidebar={closeSidebar} />
            {loading ? (
              <div className="loader-parent">
                <span class="loader"></span>
              </div>
            ) : (
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
                  placeholder="Kërko Llogaritë"
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
                />
                <button
                  className="sidebar-trigger-button shadow-one"
                  onClick={openSidebar}
                >
                  <Menu style={{ color: "white" }} />
                </button>
              </div>
            )}
          </div>
        </AdminChecker>
      </AuthenticatorChecker>
    )
  );
};

export default ListedProducts;
