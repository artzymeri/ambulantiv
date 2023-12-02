import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import PranuesChecker from "@/components/PranuesChecker";
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
        <h1>PranuesHome</h1>
        <button onClick={logout}>logout</button>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default PranuesHome;
