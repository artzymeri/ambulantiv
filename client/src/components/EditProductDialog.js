import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import MuiAlert from "@mui/material/Alert";
import "@/styling/global.css";
import "@/styling/editdialog.css";
import Cookies from "js-cookie";

const EditProductDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    openDialog,
    editedProductData,
    handleCloseDialog,
    refreshListedProductsTable,
  } = props;

  const [isClient, setIsClient] = useState(false);
  const [distributorsData, setDistributorsData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [authenticatedAdmin, setAuthenticatedAdmin] = useState(false);

  useEffect(() => {
    setAuthenticatedAdmin(Cookies.get("adminToken") !== undefined);
    setIsClient(true);
    setEditedProduct({
      id: editedProductData.id,
      name: editedProductData.name,
      category: editedProductData.category,
      price: editedProductData.price,
      weight: editedProductData.weight,
      distributor: editedProductData.distributor,
      photo: editedProductData.photo,
      outOfStock: editedProductData.outOfStock,
      discounted: editedProductData.discounted,
      discountedPercentage: editedProductData.discountedPercentage,
    });
    axios
      .get("https://ecommerce-kosova-server.onrender.com/getdistributors")
      .then((res) => {
        setDistributorsData(res.data);
      });
    setLocalOpenDialog(openDialog);
  }, [editedProductData, openDialog]);

  const [editedProduct, setEditedProduct] = useState({
    name: null,
    category: null,
    price: null,
    weight: null,
    distributor: null,
    photo: null,
    outOfStock: false,
    discounted: false,
    discountedPercentage: null,
  });

  const [file, setFile] = useState(null);

  const fileReader = new FileReader();

  const handleFileChange = (file) => {
    setFile(file);
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setEditedProduct({ ...editedProduct, photo: e.target.result });
    };
  };

  const [localOpenDialog, setLocalOpenDialog] = useState(openDialog);

  const handleEditProduct = () => {
    if (
      editedProduct.name == null ||
      editedProduct.name == "" ||
      editedProduct.category == null ||
      editedProduct.category == "" ||
      editedProduct.price == null ||
      editedProduct.price == "" ||
      editedProduct.weight == null ||
      editedProduct.weight == "" ||
      editedProduct.photo == null ||
      editedProduct.photo == ""
    ) {
      window.alert("Mbushni të gjitha rubrikat");
      return;
    } else if (
      editedProduct.discounted == true &&
      (editedProduct.discountedPercentage == null ||
        editedProduct.discountedPercentage == "")
    ) {
      window.alert("Cakto perqindjen e aksionit");
      return;
    }
    axios
      .post(
        `https://ecommerce-kosova-server.onrender.com/editproduct/${editedProduct.id}`,
        {
          editedProduct,
        }
      )
      .then((res) => {
        const { title, message } = res.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
      });
    refreshListedProductsTable();
    handleCloseDialog();
  };

  const categories = [
    {
      id: 1,
      name: "Pije",
    },
    {
      id: 2,
      name: "Fruta dhe Perime",
    },
    {
      id: 3,
      name: "Ushqimore",
    },
    {
      id: 4,
      name: "Shtëpiake",
    },
    {
      id: 5,
      name: "Higjenë",
    },
  ];

  return (
    isClient && (
      <>
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
        <Dialog
          fullScreen={fullScreen}
          open={localOpenDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Edito Produktin"}
          </DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <TextField
                id="name"
                label="Emri i Produktit"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                value={editedProduct.name}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
              />
              <TextField
                id="category"
                label="Kategoria"
                variant="outlined"
                className="shadow-one"
                fullWidth
                select
                autoComplete="off"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              >
                {categories.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                id="price"
                label="Çmimi i Produktit"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
              />
              <TextField
                id="weight"
                label="Pesha e Produktit"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                value={editedProduct.weight}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, weight: e.target.value })
                }
              />
              {authenticatedAdmin && (
                <TextField
                  id="distributor"
                  select
                  label="Distributori"
                  variant="outlined"
                  className="shadow-one"
                  fullWidth
                  autoComplete="off"
                  value={editedProduct.distributor}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      distributor: e.target.value,
                    })
                  }
                >
                  {distributorsData.map((distributor, index) => {
                    return (
                      <MenuItem key={index} value={distributor.companyname}>
                        {distributor.companyname}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value={null}>Asnjë</MenuItem>
                </TextField>
              )}
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={true}
                  checked={editedProduct.outOfStock}
                  control={<Radio />}
                  label="Nuk ka stock"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      outOfStock: true,
                    })
                  }
                />
                <FormControlLabel
                  value={false}
                  checked={!editedProduct.outOfStock}
                  control={<Radio />}
                  label="Ka stock"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      outOfStock: false,
                    })
                  }
                />
              </RadioGroup>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={true}
                  checked={editedProduct.discounted}
                  control={<Radio />}
                  label="Në aksion"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      discounted: true,
                    })
                  }
                />
                <FormControlLabel
                  value={false}
                  checked={!editedProduct.discounted}
                  control={<Radio />}
                  label="Çmimi real"
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      discounted: false,
                    })
                  }
                />
              </RadioGroup>
              {editedProduct.discounted && (
                <TextField
                  id="discountedPercentage"
                  label="Përqindja e zbritjes"
                  variant="outlined"
                  className="shadow-one"
                  fullWidth
                  autoComplete="off"
                  value={editedProduct.discountedPercentage}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      discountedPercentage: e.target.value,
                    })
                  }
                />
              )}
              <div className="file-uploader-container-edit">
                <FileUploader
                  multiple={false}
                  handleChange={handleFileChange}
                  name="file"
                  required={true}
                  hoverTitle="Vendose këtu"
                  label="Ngarko fotografinë ose zvarrite këtu"
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {file
                    ? `Emri i fotografisë: ${file.name}`
                    : "Asnjë fotografi nuk është ngarkuar akoma"}
                </p>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="edit-dialog-actions">
            <Button
              autoFocus
              variant="outlined"
              color="error"
              onClick={handleCloseDialog}
            >
              Mbyll
            </Button>
            <Button variant="contained" onClick={handleEditProduct} autoFocus>
              Edito
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

export default EditProductDialog;
