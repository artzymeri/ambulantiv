import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import PranuesChecker from "@/components/Checkers/PranuesChecker";
import PranuesHomeView from "@/components/Pranues/PranuesHomeView";
import PranuesSideBar from "@/components/Pranues/PranuesSideBar";
import { useRouter } from "next/router";
import React from "react";

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
              overflow:'clip'
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
