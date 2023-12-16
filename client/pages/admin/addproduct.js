import AddProductView from "@/components/AddProductView";
import AdminChecker from "@/components/Checkers/AdminChecker";
import AdminSideBar from "@/components/Admin/AdminSideBar";
import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import React from "react";
import Head from "next/head";

const AddProduct = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Shto Produkt</title>
      </Head>
      <AuthenticatorChecker>
        <AdminChecker>
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <AdminSideBar />
            <AddProductView />
          </div>
        </AdminChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default AddProduct;
