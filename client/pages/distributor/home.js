import { Home, Menu } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  {
    ssr: false,
  }
);

const DistributorHomeView = dynamic(
  () => import("@/components/Distributor/DistributorHomeView"),
  {
    ssr: false,
  }
);

const DistributorChecker = dynamic(
  () => import("@/components/Checkers/DistributorChecker"),
  {
    ssr: false,
  }
);

const DistributorSideBar = dynamic(
  () => import("@/components/Distributor/DistributorSideBar"),
  {
    ssr: false,
  }
);

const DistributorHome = () => {
  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Ballina</title>
      </Head>
      <AuthenticatorChecker>
        <DistributorChecker>
          <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
            <DistributorSideBar display={display} closeSidebar={closeSidebar} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "whitesmoke",
                width: "100%",
              }}
            >
              {loading ? (
                <div className="loader-parent">
                  <span className="loader"></span>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      display: "flex",
                      gap: "10px",
                      border: "1px solid lightgray",
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      flexShrink: "0",
                      zIndex: "999",
                      height: "70px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.17em",
                      fontWeight: "800",
                      color: "rgb(130, 30, 30)",
                    }}
                  >
                    <Home sx={{ marginBottom: "2px" }} />
                    Ballina
                  </div>
                  <DistributorHomeView setLoading={setLoading} />
                  <div className="sidebar-distributor-trigger-wrapper">
                    <button
                      className="sidebar-distributor-trigger-button shadow-one"
                      onClick={openSidebar}
                    >
                      <Menu style={{ color: "white" }} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DistributorChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default DistributorHome;
