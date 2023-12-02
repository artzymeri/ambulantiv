import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DistributorSideBar from "./DistributorSideBar";

const DistributorHomeUI = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("distributorToken");
    router.push("/auth/login");
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <DistributorSideBar />
      <div style={{ height: "100%", flexGrow: 1, background: "red" }}> a </div>
    </div>
  );
};

export default DistributorHomeUI;
