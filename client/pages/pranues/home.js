import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Home from "..";

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

const PranuesHomeView = dynamic(
  () => import("@/components/Pranues/PranuesHomeView"),
  {
    ssr: false,
  }
);

const PranuesHome = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Ballina</title>
      </Head>
      <AuthenticatorChecker>
        <PranuesChecker>
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <PranuesSideBar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                width: "100%",
                overflow: "clip",
                background: "whitesmoke",
              }}
            >
              <PranuesHomeView />
            </div>
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default PranuesHome;
