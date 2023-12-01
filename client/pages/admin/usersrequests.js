import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import axios from "axios";
import TableComponent from "@/components/TableComponent";

const UsersRequests = () => {
  const router = useRouter();

  const [userRequestsData, setUserRequestsData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshRate, setRefreshRate] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8080/registerrequests").then((res) => {
      setUserRequestsData(res.data);
      setLoading(false);
    });
  }, [refreshRate]);

  const approveRequest = (user) => {
    axios.post("http://localhost:8080/register", {
      namesurname: user.namesurname,
      companyname: user.companyname,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      password: user.password,
      companyType: user.companyType,
    });

    axios
      .delete(`http://localhost:8080/deleteregisterrequest/${user.id}`)
      .then(() => {
        axios.get("http://localhost:8080/registerrequests").then((res) => {
          setUserRequestsData(res.data);
        });
      });
  };

  const deleteRequest = (user) => {
    axios
      .delete(`http://localhost:8080/deleteregisterrequest/${user.id}`)
      .then(() => {
        axios.get("http://localhost:8080/registerrequests").then((res) => {
          setUserRequestsData(res.data);
        });
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

  return (
    <AuthenticatorChecker>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AdminSideBar />
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
              overflowX: 'clip'
            }}
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Kërko Llogaritë"
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "15px",
                border: "1px solid black",
                paddingLeft: "15px",
              }}
              className="shadow-one"
            />
            <TableComponent
              columns={columns}
              rows={rows}
              searchInput={searchInput}
            />
          </div>
        )}
      </div>
    </AuthenticatorChecker>
  );
};

export default UsersRequests;
