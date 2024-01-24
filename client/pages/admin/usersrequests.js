import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styling/global.css";
import axios from "axios";
import { Menu } from "@mui/icons-material";
import Head from "next/head";
import dynamic from "next/dynamic";

const AuthenticatorChecker = dynamic(
  () => import("@/components/Checkers/AuthenticatorChecker"),
  {
    ssr: false,
  }
);

const AdminSideBar = dynamic(() => import("@/components/Admin/AdminSideBar"), {
  ssr: false,
});

const TableComponent = dynamic(() => import("@/components/TableComponent"), {
  ssr: false,
});

const AdminChecker = dynamic(
  () => import("@/components/Checkers/AdminChecker"),
  {
    ssr: false,
  }
);

const UsersRequests = () => {
  const router = useRouter();

  const [userRequestsData, setUserRequestsData] = useState([]);

  const [isClient, setIsClient] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://ecommerce-kosova-server.onrender.com/getrequests").then((res) => {
      setUserRequestsData(res.data);
      setLoading(false);
    });
    setIsClient(true);
  }, []);

  const approveRequest = (user) => {
    setLoading(true)
    axios.post("https://ecommerce-kosova-server.onrender.com/register", {
      namesurname: user.namesurname,
      companyname: user.companyname,
      address: user.address,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      password: user.password,
      companyType: user.companyType,
      companyLogo: user.companyLogo,
    });

    axios
      .delete(`https://ecommerce-kosova-server.onrender.com/deleteregisterrequest/${user.id}`)
      .then(() => {
        axios.get("https://ecommerce-kosova-server.onrender.com/getrequests").then((res) => {
          setUserRequestsData(res.data);
        });
      }).finally(()=>{
        setLoading(false)
      })
  };

  const deleteRequest = (user) => {
    setLoading(true);
    axios
      .delete(`https://ecommerce-kosova-server.onrender.com/deleteregisterrequest/${user.id}`)
      .then(() => {
        axios.get("https://ecommerce-kosova-server.onrender.com/getrequests").then((res) => {
          setUserRequestsData(res.data);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      id: 1,
      name: "Emri dhe Mbiemri",
    },
    {
      id: 2,
      name: "Emri i Kompanisë",
    },
    {
      id: 3,
      name: "Numri i Telefonit",
    },
    {
      id: 4,
      name: "Email Adresa",
    },
    {
      id: 5,
      name: "Lloji i Kompanisë",
    },
    {
      id: 6,
      name: "Butonat",
    },
  ];

  const rows = userRequestsData;

  const [searchInput, setSearchInput] = useState("");

  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  return (
    isClient && (
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
          <title>Kërkesat për regjistrim</title>
        </Head>
        <AuthenticatorChecker>
          <AdminChecker>
            <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
              <AdminSideBar display={display} closeSidebar={closeSidebar} />
              {loading ? (
                <div className="loader-parent">
                  <span class="loader"></span>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    padding: "30px",
                    flexDirection: "column",
                    gap: "15px",
                    flexGrow: 1,
                    overflowX: "clip",
                  }}
                >
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Kërko llogaritë"
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      border: "1px solid black",
                      paddingLeft: "15px",
                    }}
                    className="shadow-one"
                  />
                  <TableComponent
                    columns={columns}
                    rows={rows}
                    searchInput={searchInput}
                    requestsButtons={true}
                    deleteRequest={deleteRequest}
                    approveRequest={approveRequest}
                    requestsList={true}
                  />
                  <button
                    className="sidebar-trigger-button shadow-one"
                    onClick={openSidebar}
                  >
                    <Menu style={{ color: "white" }} />
                  </button>
                </div>
              )}
            </div>
          </AdminChecker>
        </AuthenticatorChecker>
      </>
    )
  );
};

export default UsersRequests;
