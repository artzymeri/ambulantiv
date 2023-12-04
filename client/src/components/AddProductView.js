import React, { useEffect, useState } from "react";
import AuthenticatorChecker from "./AuthenticatorChecker";
import AdminChecker from "./AdminChecker";
import "@/styling/addproductview.css";
import "@/styling/global.css";
import { Button, MenuItem, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FileUploader } from "react-drag-drop-files";
import { AddBox, AddBoxOutlined } from "@mui/icons-material";
import axios from "axios";

const AddProductView = () => {
  const [isClient, setIsClient] = useState(false);
  const [distributorsData, setDistributorsData] = useState([]);

  useEffect(() => {
    setIsClient(true);
    axios.get("http://localhost:8080/getdistributors").then((res) => {
      setDistributorsData(res.data);
      console.log(res.data);
    });
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [newProduct, setNewProduct] = useState({
    name: null,
    price: null,
    weight: null,
    distributor: null,
    photo: null,
  });

  const [file, setFile] = useState(null);

  const fileReader = new FileReader();

  const handleFileChange = (file) => {
    setFile(file);
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setNewProduct({ ...newProduct, photo: e.target.result });
    };
  };

  const addProductFunction = () => {
    axios
      .post("http://localhost:8080/addnewproduct", { newProduct })
      .then((res) => {
        const { title, message } = res.data;
        setNewProduct({
          ...newProduct,
          name: null,
          price: null,
          weight: null,
          distributor: null,
        });
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
      });
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
          <div className="add-product_parent">
            <div className="add-product_container shadow-one">
              <h3 className="shadow-one">Listo produkt të ri</h3>
              <TextField
                id="name"
                label="Emri i Produktit"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <TextField
                id="price"
                label="Çmimi i Produktit"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <TextField
                id="weight"
                label="Pesha e Produktit"
                variant="outlined"
                className="shadow-one"
                type="number"
                fullWidth
                autoComplete="off"
                value={newProduct.weight}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, weight: e.target.value })
                }
              />
              <TextField
                id="distributor"
                select
                label="Distributori"
                variant="outlined"
                className="shadow-one"
                fullWidth
                autoComplete="off"
                value={newProduct.distributor}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, distributor: e.target.value })
                }
              >
                {distributorsData.map((distributor) => {
                  return (
                    <MenuItem value={distributor.companyname}>
                      {distributor.companyname}
                    </MenuItem>
                  );
                })}
                <MenuItem value={null}>Asnjë</MenuItem>
              </TextField>
              <div className="file-uploader-container">
                <FileUploader
                  multiple={false}
                  handleChange={handleFileChange}
                  name="file"
                  required={true}
                  hoverTitle="Vendose këtu"
                  label="Ngarko fotografinë ose zvarrite këtu"
                />
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                  {file
                    ? `Emri i fotografisë: ${file.name}`
                    : "Asnjë fotografi nuk është ngarkuar akoma"}
                </p>
              </div>
              <Button
                onClick={addProductFunction}
                className="add-product_button"
                variant="contained"
              >
                <AddBox /> Shto Produktin
              </Button>
            </div>
          </div>
        </AdminChecker>
      </AuthenticatorChecker>
    )
  );
};

export default AddProductView;
