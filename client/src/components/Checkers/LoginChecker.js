import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";

const LoginChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = Cookies.get("adminToken") !== undefined;
    const authenticatedDistributor =
      Cookies.get("distributorToken") !== undefined;
    const authenticatedPranues = Cookies.get("pranuesToken") !== undefined;

    const logout = () => {
      if (authenticatedAdmin) {
        Cookies.remove("adminToken");
        localStorage.removeItem("userId");
        window.location.reload();
      } else if (authenticatedDistributor) {
        Cookies.remove("distributorToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("emailaddress");
        localStorage.removeItem("phonenumber");
        localStorage.removeItem("companyname");
        window.location.reload();
      } else if (authenticatedPranues) {
        Cookies.remove("pranuesToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("emailaddress");
        localStorage.removeItem("phonenumber");
        localStorage.removeItem("companyname");
        window.location.reload();
      }
    };

    if (
      authenticatedPranues ||
      authenticatedAdmin ||
      authenticatedDistributor
    ) {
      return (
        <>
          <Head>
            <link rel="icon" href="/e-commerceKosovaLogo.png" />
          </Head>
          <h1>You are already logged in</h1>
          <button onClick={logout}>logout</button>
        </>
      );
    } else {
      return <>{children}</>;
    }
  }
};

export default LoginChecker;
