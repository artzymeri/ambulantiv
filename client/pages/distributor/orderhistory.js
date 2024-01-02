import dynamic from "next/dynamic";
import React from "react";

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

const OrdersHistoryView = dynamic(
  () => import("@/components/Distributor/OrdersHistoryView"),
  {
    ssr: false,
  }
);

const Orders = () => {
  return (
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
          <DistributorSideBar />
          <OrdersHistoryView />
        </div>
      </DistributorChecker>
    </AuthenticatorChecker>
  );
};

export default Orders;
