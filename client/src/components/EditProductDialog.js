import { useTheme } from "@mui/material/styles";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const EditProductDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { openDialog, editedProductData, handleCloseDialog } = props;

  const [isClient, setIsClient] = useState(false);
  const [distributorsData, setDistributorsData] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    name: editedProductData.name,
    price: editedProductData.price,
    weight: editedProductData.weight,
    distributor: editedProductData.distributor,
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

  useEffect(() => {
    setIsClient(true);
    axios.get("http://localhost:8080/getdistributors").then((res) => {
      setDistributorsData(res.data);
    });
    setLocalOpenDialog(openDialog);
  }, [openDialog]);

  const [localOpenDialog, setLocalOpenDialog] = useState(openDialog);

  console.log(localOpenDialog);

  return (
    isClient && (
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
            type="number"
            fullWidth
            autoComplete="off"
            value={editedProduct.weight}
            onChange={(e) =>
              setEditedProduct({ ...newProduct, weight: e.target.value })
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
            value={editedProduct.distributor}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                distributor: e.target.value,
              })
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Disagree
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default EditProductDialog;
