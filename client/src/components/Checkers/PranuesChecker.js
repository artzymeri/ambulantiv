import { useRouter } from "next/router";

const PranuesChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedPranues = localStorage.getItem("pranuesToken");
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributor = localStorage.getItem("distributorToken");

    if (authenticatedPranues) {
      return <>{children}</>;
    } else if (authenticatedAdmin || authenticatedDistributor) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }
};

export default PranuesChecker;
