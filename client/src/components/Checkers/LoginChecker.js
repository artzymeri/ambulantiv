import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LoginChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = Cookies.get("adminToken") !== undefined;
    const authenticatedDistributor =
      Cookies.get("distributorToken") !== undefined;
    const authenticatedPranues = Cookies.get("pranuesToken") !== undefined;

    if (
      authenticatedPranues ||
      authenticatedAdmin ||
      authenticatedDistributor
    ) {
      router.push("/");
    } else {
      return <>{children}</>;
    }
  }
};

export default LoginChecker;
