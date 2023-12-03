import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import axios from "axios";
import TableComponent from "@/components/TableComponent";
import { Menu } from "@mui/icons-material";
import AdminChecker from "@/components/AdminChecker";

const ListedProducts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [listedProductsData, setListedProductsData] = useState([]);

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

  return (
    isClient && (
      <AuthenticatorChecker>
        <AdminChecker>
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
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
