import Cookies from "js-cookie";
import { useRouter } from "next/router";

const AdminChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = Cookies.get("adminToken") !== undefined;
    const authenticatedDistributor =
      Cookies.get("distributorToken") !== undefined;
    const authenticatedPranues = Cookies.get("pranuesToken") !== undefined;

    if (authenticatedAdmin) {
      return <>{children}</>;
    } else if (authenticatedPranues || authenticatedDistributor) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }
};

export default AdminChecker;
