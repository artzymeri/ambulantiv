import React, { useEffect } from "react";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import DistributorHomeUI from "@/components/DistributorHomeUI";
import PranuesHomeUI from "@/components/PranuesHomeUI";
import { useRouter } from "next/router";
import "@/styling/global.css";

const Home = () => {
  const router = useRouter();

  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const distributorToken =
    typeof window !== "undefined"
      ? localStorage.getItem("distributorToken")
      : null;

  const pranuesToken =
    typeof window !== "undefined" ? localStorage.getItem("pranuesToken") : null;

  if (adminToken && adminToken !== null) {
    router.push("/admin/registeredusers");
  }

  return (
    <AuthenticatorChecker>
      {distributorToken && distributorToken !== null ? (
        <DistributorHomeUI />
      ) : null}
      {pranuesToken && pranuesToken !== null ? <PranuesHomeUI /> : null}
    </AuthenticatorChecker>
  );
};

export default Home;
