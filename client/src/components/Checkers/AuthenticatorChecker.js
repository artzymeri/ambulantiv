import { useRouter } from "next/router";

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributor = localStorage.getItem("distributorToken");
    const authenticatedPranues = localStorage.getItem("pranuesToken");

    if (
      authenticatedAdmin ||
      authenticatedDistributor ||
      authenticatedPranues
    ) {
      return <>{children}</>;
    } else {
      router.push("/auth/login");
    }
  }
};

export default AuthenticatorChecker;
