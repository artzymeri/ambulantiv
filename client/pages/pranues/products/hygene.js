import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import PranuesChecker from "@/components/Checkers/PranuesChecker";
import PranuesSideBar from "@/components/Pranues/PranuesSideBar";
import ProductsView from "@/components/ProductsView";
import Head from "next/head";
import React from "react";

const Hygene = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Higjenë</title>
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
            <ProductsView hygeneProducts={true} />
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default Hygene;
