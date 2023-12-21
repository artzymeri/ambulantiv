import React, { useEffect } from "react";
import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
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
  } else if (distributorToken && distributorToken !== null) {
    router.push("/distributor/home");
  } else if (pranuesToken && pranuesToken !== null) {
    router.push("/pranues/home");
  }

  return <AuthenticatorChecker></AuthenticatorChecker>;
};


export default Home;
