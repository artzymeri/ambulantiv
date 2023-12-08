import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import PranuesChecker from "@/components/Checkers/PranuesChecker";
import PranuesSideBar from "@/components/Pranues/PranuesSideBar";
import ProductsView from "@/components/ProductsView";
import React from "react";

const Housekeep = () => {
  return (
    <AuthenticatorChecker>
      <PranuesChecker>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "clip",
          }}
        >
          <PranuesSideBar />
          <ProductsView housekeepProducts={true} />
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default Housekeep;
