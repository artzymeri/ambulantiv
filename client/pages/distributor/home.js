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

  const activateLoader = () => {
    setLoading(true);
  };

  const deactivateLoader = () => {
    setLoading(false);
  };

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
              <>
                <DistributorHomeView />
                <div className="sidebar-distributor-trigger-wrapper">
                  <button
                    className="sidebar-distributor-trigger-button shadow-one"
                    onClick={openSidebar}
                  >
                    <Menu style={{ color: "white" }} />
                  </button>
                </div>
              </>
            </div>
          </div>
        </DistributorChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default DistributorHome;
