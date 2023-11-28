import { useRouter } from "next/router";

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticated = localStorage.getItem("authenticated");

    if (!authenticated) {
      router.push("/auth/login");
    } else {
      return <>{children}</>;
    }
  }
};

export default AuthenticatorChecker;
