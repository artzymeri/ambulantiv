import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

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

const CompanyPage = () => {
  const router = useRouter();

  const query = router.query;

  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Produktet e kompanisë</title>
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
            <ProductsView companyname={query} />
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default CompanyPage;
