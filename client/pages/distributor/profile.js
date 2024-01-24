import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Menu } from "@mui/icons-material";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  { ssr: false }
);

const DistributorChecker = dynamic(
  () => import("@/components/Checkers/DistributorChecker"),
  { ssr: false }
);

const DistributorSideBar = dynamic(
  () => import("@/components/Distributor/DistributorSideBar"),
  { ssr: false }
);

const ProfileView = dynamic(
  () => import("@/components/ProfileViewDistributor"),
  {
    ssr: false,
  }
);

const Profile = () => {
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
            width: "100vw",
            height: "100dvh",
            overflowX: "clip",
          }}
        >
          <DistributorSideBar display={display} closeSidebar={closeSidebar} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <ProfileView openSidebar={openSidebar} />
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
  );
};

export default Profile;
