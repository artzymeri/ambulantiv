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
              overflow: "clip",
            }}
          >
            <DistributorSideBar someState={someState} />
            <OrdersView updateStateInSideBar={updateStateInSideBar} />
          </div>
        </DistributorChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default Orders;
