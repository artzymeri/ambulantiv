import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import DistributorChecker from "@/components/Checkers/DistributorChecker";
import DistributorHomeView from "@/components/Distributor/DistributorHomeView";
import DistributorSideBar from "@/components/Distributor/DistributorSideBar";
import { Home, Menu } from "@mui/icons-material";
import Head from "next/head";
import React, { useState } from "react";

const DistributorHome = () => {
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
        <DistributorChecker>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <DistributorSideBar display={display} closeSidebar={closeSidebar} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
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
                <DistributorHomeView />
              </div>
              <div className="sidebar-distributor-trigger-wrapper">
                <button
                  className="sidebar-distributor-trigger-button shadow-one"
                  onClick={openSidebar}
                >
                  <Menu style={{ color: "white" }} />
                </button>
              </div>
            </div>
          </div>
        </DistributorChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default DistributorHome;
