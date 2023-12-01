import React, { useEffect, useState } from "react";
import AdminSideBar from "@/components/AdminSideBar";
import "@/styling/global.css";
import AuthenticatorChecker from "@/components/AuthenticatorChecker";
import TableComponent from "@/components/TableComponent";
import axios from "axios";

const RegisteredUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const [refreshRate, setRefreshRate] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/getusers").then((res) => {
      setUsersData(res.data);
      setLoading(false);
    });
  }, [refreshRate]);

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
  ];

  const rows = usersData;

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
              width: "calc(100vw - 300px)",
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

export default RegisteredUsers;
