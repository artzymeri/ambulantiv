import dynamic from "next/dynamic";
import React from "react";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  { ssr: false }
);

const PranuesChecker = dynamic(
  () => import("@/components/Checkers/PranuesChecker"),
  { ssr: false }
);

const PranuesSideBar = dynamic(
  () => import("@/components/Pranues/PranuesSideBar"),
  { ssr: false }
);

const ProductsView = dynamic(() => import("@/components/ProductsView"), {
  ssr: false,
});

const Products = () => {
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
          <ProductsView allProducts={true} />
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default Products;
