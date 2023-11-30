import React from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";

const RegisteredUsers = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/auth/login");
  };

  return (
    <AuthenticatorChecker>
      <AdminSideBar />
      <button onClick={logout}>logout</button>
    </AuthenticatorChecker>
  );
};

export default RegisteredUsers;
