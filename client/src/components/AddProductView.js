import React, { useEffect, useState } from "react";
import AuthenticatorChecker from "./AuthenticatorChecker";
import AdminChecker from "./AdminChecker";
import "@/styling/addproductview.css";
import "@/styling/global.css";
import { Button, MenuItem, TextField } from "@mui/material";

const AddProductView = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: null,
    price: null,
    weight: null,
    distributor: null,
  });

  return (
    isClient && (
      <AuthenticatorChecker>
        <AdminChecker>
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
                onChange={(e) =>
                  setNewProduct({ ...newProduct, distributor: e.target.value })
                }
              >
                <MenuItem value="Tadim">Tadim</MenuItem>
                <MenuItem value="Kralin">Kralin</MenuItem>
                <MenuItem value="Emona">Emona</MenuItem>
                <MenuItem value={null}>Asnjë</MenuItem>
              </TextField>
              <Button className="add-product_button" variant="contained">
                Shto Produktin
              </Button>
            </div>
          </div>
        </AdminChecker>
      </AuthenticatorChecker>
    )
  );
};

export default AddProductView;
