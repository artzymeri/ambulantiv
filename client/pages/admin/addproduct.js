import React, { useState } from "react";
import Head from "next/head";
import "@/styling/Admin/adminsidebar.css";
import dynamic from "next/dynamic";
import { Menu } from "@mui/icons-material";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  { ssr: false }
);

const AddProductView = dynamic(() => import("@/components/AddProductView"), {
  ssr: false,
});

const AdminChecker = dynamic(
  () => import("@/components/Checkers/AdminChecker"),
  { ssr: false }
);

const AdminSideBar = dynamic(() => import("@/components/Admin/AdminSideBar"), {
  ssr: false,
});

const AddProduct = () => {
  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Shto Produkt</title>
      </Head>
      <AuthenticatorChecker>
        <AdminChecker>
          <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
            <AdminSideBar display={display} closeSidebar={closeSidebar} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                gap: "15px",
                background: "whitesmoke",
                width: "100%",
              }}
            >
              <AddProductView />
              <button
                className="sidebar-trigger-button shadow-one"
                onClick={openSidebar}
              >
                <Menu style={{ color: "white" }} /> a
              </button>
            </div>
          </div>
        </AdminChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default AddProduct;
