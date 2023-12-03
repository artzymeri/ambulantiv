import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import DistributorChecker from "@/components/DistributorChecker";
import DistributorSideBar from "@/components/DistributorSideBar";
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
        <DistributorSideBar />
      </DistributorChecker>
    </AuthenticatorChecker>
  );
};

export default DistributorHome;
