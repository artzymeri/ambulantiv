import { useRouter } from "next/router";

const AdminChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = document.cookie.includes("adminToken");
    const authenticatedDistributor =
      document.cookie.includes("distributorToken");
    const authenticatedPranues = document.cookie.includes("pranuesToken");

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
