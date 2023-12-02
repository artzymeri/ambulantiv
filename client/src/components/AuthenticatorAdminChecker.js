import { useRouter } from "next/router";

const AuthenticatorAdminChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = localStorage.getItem("adminToken");

    if (authenticatedAdmin) {
      return <>{children}</>;
    } else {
      router.push("/auth/login");
    }
  }
};

export default AuthenticatorAdminChecker;
