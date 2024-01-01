import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import DistributorChecker from "@/components/Checkers/DistributorChecker";
import DistributorSideBar from "@/components/Distributor/DistributorSideBar";
import OrdersView from "@/components/Distributor/OrdersView";
import React, { useState } from "react";

const Orders = () => {
  const [someState, setSomeState] = useState(1);

  // Callback function to be passed to OrdersView
  const updateStateInSideBar = (newValue) => {
    setSomeState(someState + newValue);
  };

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
          <DistributorSideBar someState={someState} />
          <OrdersView updateStateInSideBar={updateStateInSideBar} />
        </div>
      </DistributorChecker>
    </AuthenticatorChecker>
  );
};

export default Orders;
