import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DistributorHomeUI = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("distributorToken");
    router.push("/auth/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Distributor</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default DistributorHomeUI;
