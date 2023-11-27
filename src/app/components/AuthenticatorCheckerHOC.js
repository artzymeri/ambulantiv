import React, { useEffect } from "react";
import { useRouter } from "next/router";

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      router.push("/auth/login");
    }
  }

  return <>{children}</>;
};

export default AuthenticatorChecker;
