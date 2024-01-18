import dynamic from "next/dynamic";
import React, { useState } from "react";
import Head from "next/head";
import { Menu } from "@mui/icons-material";

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

const ProfileView = dynamic(() => import("@/components/ProfileViewPranues"), {
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
        <PranuesChecker>
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              overflowX: "clip",
            }}
          >
            <PranuesSideBar display={display} closeSidebar={closeSidebar} />
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
    </>
  );
};

export default Profile;
