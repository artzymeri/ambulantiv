import React from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";

const RegisteredUsers = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/auth/login");
  };

  return (
    <div>
      <AdminSideBar />
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default RegisteredUsers;
