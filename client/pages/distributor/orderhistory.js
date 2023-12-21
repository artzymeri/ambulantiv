import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import DistributorChecker from "@/components/Checkers/DistributorChecker";
import DistributorSideBar from "@/components/Distributor/DistributorSideBar";
import OrdersHistoryView from "@/components/Distributor/OrdersHistoryView";
import React from "react";

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
