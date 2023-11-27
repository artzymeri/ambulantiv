import React from "react";
import { useRouter } from "next/router";
import AuthenticatorChecker from "@/app/components/AuthenticatorCheckerHOC";

const Home = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("authenticated", false);
    router.push("/auth/login");
  };

  return (
    <AuthenticatorChecker>
      <h1>Welcome Home</h1>
      <button onClick={logout}>logout</button>
    </AuthenticatorChecker>
  );
};

export default Home;
