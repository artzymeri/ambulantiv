import { useRouter } from "next/router";

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributorAdmin = localStorage.getItem(
      "distributorAdminToken"
    );
    const authenticatedDistributorUser = localStorage.getItem(
      "distributorUserToken"
    );

    if (
      authenticatedAdmin ||
      authenticatedDistributorAdmin ||
      authenticatedDistributorUser
    ) {
      return <>{children}</>;
    } else {
      router.push("/auth/login");
    }
  }
};

export default AuthenticatorChecker;
