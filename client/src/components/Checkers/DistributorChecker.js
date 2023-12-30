import { useRouter } from "next/router";

const DistributorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = document.cookie.includes("adminToken");
    const authenticatedDistributor =
      document.cookie.includes("distributorToken");
    const authenticatedPranues = document.cookie.includes("pranuesToken");

    if (authenticatedDistributor) {
      return <>{children}</>;
    } else if (authenticatedAdmin || authenticatedPranues) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }
};

export default DistributorChecker;
