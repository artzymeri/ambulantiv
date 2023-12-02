import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import DistributorChecker from "@/components/DistributorChecker";
import { useRouter } from "next/router";
import React from "react";

const DistributorHome = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("distributorToken");
    router.push("/auth/login");
  };
  return (
    <AuthenticatorChecker>
      <DistributorChecker>
        <h1>DistributorHome</h1>
        <button onClick={logout}>logout</button>
      </DistributorChecker>
    </AuthenticatorChecker>
  );
};

export default DistributorHome;
