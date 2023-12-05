import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import DistributorChecker from "@/components/DistributorChecker";
import DistributorHomeView from "@/components/DistributorHomeView";
import DistributorSideBar from "@/components/DistributorSideBar";
import { Menu } from "@mui/icons-material";
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
              padding: "30px",
            }}
          >
            <DistributorHomeView />
            <button
              className="sidebar-distributor-trigger-button shadow-one"
              onClick={openSidebar}
            >
              <Menu style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </DistributorChecker>
    </AuthenticatorChecker>
  );
};

export default DistributorHome;
