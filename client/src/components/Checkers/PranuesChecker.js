import Cookies from "js-cookie";
import { useRouter } from "next/router";

const PranuesChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = Cookies.get("adminToken") !== undefined;
    const authenticatedDistributor =
      Cookies.get("distributorToken") !== undefined;
    const authenticatedPranues = Cookies.get("pranuesToken") !== undefined;

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
