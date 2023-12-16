import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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

const companyPage = () => {
  const router = useRouter();

  const query = router.query;

  console.log(query);

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
          <ProductsView companyname={query} />
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default companyPage;
