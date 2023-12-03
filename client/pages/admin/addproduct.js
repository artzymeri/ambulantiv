import AddProductView from "@/components/AddProductView";
import AdminChecker from "@/components/AdminChecker";
import AdminSideBar from "@/components/AdminSideBar";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import React from "react";

const AddProduct = () => {
  return (
    <AuthenticatorChecker>
      <AdminChecker>
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <AdminSideBar />
          <AddProductView />
        </div>
      </AdminChecker>
    </AuthenticatorChecker>
  );
};

export default AddProduct;
