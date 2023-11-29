import React, { useEffect } from "react";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import AdminUI from "@/components/AdminHomeUI";
import DistributorHomeUI from "@/components/DistributorHomeUI";
import PranuesHomeUI from "@/components/PranuesHomeUI";

const Home = () => {
  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const distributorToken =
    typeof window !== "undefined"
      ? localStorage.getItem("distributorToken")
      : null;

  const pranuesToken =
    typeof window !== "undefined" ? localStorage.getItem("pranuesToken") : null;

  return (
    <AuthenticatorChecker>
      {adminToken && adminToken !== null ? <AdminUI /> : null}
      {distributorToken && distributorToken !== null ? (
        <DistributorHomeUI />
      ) : null}
      {pranuesToken && pranuesToken !== null ? <PranuesHomeUI /> : null}
    </AuthenticatorChecker>
  );
};

export default Home;
