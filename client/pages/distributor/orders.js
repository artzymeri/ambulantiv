import { Menu } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
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

const OrdersView = dynamic(
  () => import("@/components/Distributor/OrdersView"),
  {
    ssr: false,
  }
);

const Orders = () => {
  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  const [someState, setSomeState] = useState(1);

  // Callback function to be passed to OrdersView
  const updateStateInSideBar = (newValue) => {
    setSomeState(someState + newValue);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Porositë Aktive</title>
      </Head>
      <AuthenticatorChecker>
        <DistributorChecker>
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              overflowX: "clip",
            }}
          >
            <DistributorSideBar
              someState={someState}
              display={display}
              closeSidebar={closeSidebar}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <OrdersView updateStateInSideBar={updateStateInSideBar} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px 30px",
                }}
              >
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

export default Orders;
