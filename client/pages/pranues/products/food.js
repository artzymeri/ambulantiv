import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import PranuesChecker from "@/components/Checkers/PranuesChecker";
import PranuesSideBar from "@/components/Pranues/PranuesSideBar";
import ProductsView from "@/components/ProductsView";
import Head from "next/head";
import React from "react";

const Drinks = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Ushqimore</title>
      </Head>
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
            <ProductsView foodProducts={true} />
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default Drinks;
