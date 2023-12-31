import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const authenticatedAdmin = Cookies.get("adminToken") !== undefined;
    const authenticatedDistributor =
      Cookies.get("distributorToken") !== undefined;
    const authenticatedPranues = Cookies.get("pranuesToken") !== undefined;

    if (
      authenticatedAdmin ||
      authenticatedDistributor ||
      authenticatedPranues
    ) {
      return (
        <>
          <Head>
            <link rel="icon" href="/e-commerceKosovaLogo.png" />
          </Head>
          {children}
        </>
      );
    } else {
      router.push("/auth/login");
    }
  }
};

export default AuthenticatorChecker;
