import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

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
