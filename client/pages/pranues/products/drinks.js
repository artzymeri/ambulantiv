import dynamic from "next/dynamic";
import Head from "next/head";
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

const Drinks = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Pijet</title>
      </Head>
      <AuthenticatorChecker>
        <PranuesChecker>
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100dvh",
              overflow: "clip",
            }}
          >
            <PranuesSideBar />
            <ProductsView drinksProducts={true} />
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default Drinks;
