import { Menu } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import "@/styling/Pranues/pranuessidebar.css";

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

const PranuesCompaniesView = dynamic(
  () => import("@/components/Pranues/PranuesCompaniesView"),
  {
    ssr: false,
  }
);

const PranuesCompanies = () => {
  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };
  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Ballina</title>
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
            <PranuesSideBar display={display} closeSidebar={closeSidebar} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100dvh",
                width: "100%",
                overflowX: "clip",
                background: "whitesmoke",
              }}
            >
              <PranuesCompaniesView />
              <div className="sidebar-pranues-trigger-wrapper">
                <button
                  className="sidebar-pranues-trigger-button shadow-one"
                  onClick={openSidebar}
                >
                  <Menu style={{ color: "white" }} />
                </button>
              </div>
            </div>
          </div>
        </PranuesChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default PranuesCompanies;
