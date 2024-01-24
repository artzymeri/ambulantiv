import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Admin/adminsidebar.css";
import axios from "axios";
import { Menu } from "@mui/icons-material";
import Head from "next/head";
import dynamic from "next/dynamic";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  {
    ssr: false,
  }
);

const AdminSideBar = dynamic(() => import("@/components/Admin/AdminSideBar"), {
  ssr: false,
});

const TableComponent = dynamic(() => import("@/components/TableComponent"), {
  ssr: false,
});

const AdminChecker = dynamic(
  () => import("@/components/Checkers/AdminChecker"),
  {
    ssr: false,
  }
);

const RegisteredUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const [isClient, setIsClient] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce-kosova-server.onrender.com/getusers")
      .then((res) => {
        setUsersData(res.data);
        setLoading(false);
      });
    setIsClient(true);
  }, []);

  const columns = [
    {
      id: 1,
      name: "Emri dhe Mbiemri",
    },
    {
      id: 2,
      name: "Emri i Kompanisë",
    },
    {
      id: 3,
      name: "Numri i Telefonit",
    },
    {
      id: 4,
      name: "Email Adresa",
    },
    {
      id: 5,
      name: "Lloji i Kompanisë",
    },
    {
      id: 6,
      name: "Butoni",
    },
  ];

  const deleteUser = (user) => {
    axios
      .delete(
        `https://ecommerce-kosova-server.onrender.com/deleteuser/${user.id}`
      )
      .then(() => {
        setLoading(true);
        axios
          .get("https://ecommerce-kosova-server.onrender.com/getusers")
          .then((res) => {
            setUsersData(res.data);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const rows = usersData;

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
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
          <title>Llogaritë e regjistuara</title>
        </Head>
        <AuthenticatorChecker>
          <AdminChecker>
            <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
              <AdminSideBar display={display} closeSidebar={closeSidebar} />
              {loading ? (
                <div className="loader-parent">
                  <span className="loader"></span>
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
                    deleteUser={deleteUser}
                    registeredButtons={true}
                    usersList={true}
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
      </>
    )
  );
};

export default RegisteredUsers;
