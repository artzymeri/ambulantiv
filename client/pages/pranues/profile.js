import dynamic from "next/dynamic";

import { Menu } from "@mui/material";
import React, { useState } from "react";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  { ssr: false }
);

const PranuesChecker = dynamic(
  () => import("@/components/Checkers/PranuesChecker"),
  { ssr: false }
);

const PranuesSideBar = dynamic(
  () => import("@/components/Pranues/PranuesSideBar"),
  { ssr: false }
);

const ProfileView = dynamic(() => import("@/components/Pranues/ProfileView"), {
  ssr: false,
});

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
      <PranuesChecker>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "clip",
          }}
        >
          <PranuesSideBar />
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
            <div className="sidebar-pranues-trigger-wrapper">
              <button
                className="sidebar-pranues-trigger-button shadow-one"
                onClick={openSidebar}
              >
                <Menu style={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default Profile;
