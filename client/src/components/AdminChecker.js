import { useRouter } from "next/router";

const AdminChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedPranues = localStorage.getItem("pranuesToken");
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributor = localStorage.getItem("distributorToken");

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
