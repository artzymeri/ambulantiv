import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import React from "react";

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

const PranuesHomeView = dynamic(
  () => import("@/components/Pranues/PranuesHomeView"),
  {
    ssr: false,
  }
);

const PranuesHome = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("pranuesToken");
    router.push("/auth/login");
  };

  return (
    <AuthenticatorChecker>
      <PranuesChecker>
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <PranuesSideBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
              width: "100%",
              overflow: "clip",
            }}
          >
            <PranuesHomeView />
          </div>
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default PranuesHome;
