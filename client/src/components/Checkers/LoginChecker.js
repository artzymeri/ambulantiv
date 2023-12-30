import Head from "next/head";
import { useRouter } from "next/router";

const LoginChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = document.cookie.includes("adminToken");
    const authenticatedDistributor =
      document.cookie.includes("distributorToken");
    const authenticatedPranues = document.cookie.includes("pranuesToken");

    const logout = () => {
      if (authenticatedAdmin) {
        document.cookie =
          "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userId");
        window.location.reload();
      } else if (authenticatedDistributor) {
        document.cookie =
          "distributorToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userId");
        localStorage.removeItem("emailaddress");
        localStorage.removeItem("phonenumber");
        localStorage.removeItem("companyname");
        window.location.reload();
      } else if (authenticatedPranues) {
        document.cookie =
          "pranuesToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
