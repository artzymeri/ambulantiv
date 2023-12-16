import Head from "next/head";
import { useRouter } from "next/router";

const LoginChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedPranues = localStorage.getItem("pranuesToken");
    const authenticatedAdmin = localStorage.getItem("adminToken");
    const authenticatedDistributor = localStorage.getItem("distributorToken");

    const logout = () => {
      if (authenticatedAdmin) {
        localStorage.removeItem("adminToken");
        window.location.reload();
      } else if (authenticatedDistributor) {
        localStorage.removeItem("distributorToken");
        window.location.reload();
      } else if (authenticatedPranues) {
        localStorage.removeItem("pranuesToken");
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
