import dynamic from "next/dynamic";
import { Menu } from "@mui/material";
import React, { useState } from "react";
import Head from "next/head";

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

const ProfileView = dynamic(() => import("@/components/ProfileView"), {
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
    <>
      <Head>
        <link rel="icon" href="/e-commerceKosovaLogo.png" />
        <title>Detajet e profilit</title>
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
            <DistributorSideBar />
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
        </DistributorChecker>
      </AuthenticatorChecker>
    </>
  );
};

export default Profile;
