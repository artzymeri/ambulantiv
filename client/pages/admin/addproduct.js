import AddProductView from "@/components/AddProductView";
import AdminChecker from "@/components/Checkers/AdminChecker";
import AdminSideBar from "@/components/Admin/AdminSideBar";
import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
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
