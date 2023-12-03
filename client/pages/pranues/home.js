import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import PranuesChecker from "@/components/PranuesChecker";
import PranuesSideBar from "@/components/PranuesSideBar";
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
        <PranuesSideBar />
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default PranuesHome;
