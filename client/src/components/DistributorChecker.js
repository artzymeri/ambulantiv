import { useRouter } from "next/router";

const DistributorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedPranues = localStorage.getItem("pranuesToken");
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributor = localStorage.getItem("distributorToken");

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
