import { useRouter } from "next/router";

const PranuesChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = document.cookie.includes("adminToken");
    const authenticatedDistributor =
      document.cookie.includes("distributorToken");
    const authenticatedPranues = document.cookie.includes("pranuesToken");

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
