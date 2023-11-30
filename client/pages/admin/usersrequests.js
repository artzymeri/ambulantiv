import React from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";

const UsersRequests = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/auth/login");
  };

  return <button onClick={logout}>logout</button>;
};

export default UsersRequests;
