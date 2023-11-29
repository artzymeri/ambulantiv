import React, { useEffect } from "react";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import AdminUI from "@/components/AdminHomeUI";
import DistributorAdminHomeUI from "@/components/DistributorAdminHomeUI";

const Home = () => {
  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const distributorAdminToken =
    typeof window !== "undefined"
      ? localStorage.getItem("distributorAdminToken")
      : null;

  console.log(adminToken);

  return (
    <AuthenticatorChecker>
      {adminToken && adminToken !== null ? <AdminUI /> : null}
      {distributorAdminToken && distributorAdminToken !== null ? (
        <DistributorAdminHomeUI />
      ) : null}
    </AuthenticatorChecker>
  );
};

export default Home;
