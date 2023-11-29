import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AdminUI = () => {
  const router = useRouter();

  const [userRequests, setUserRequests] = useState([]);

  const [refreshRate, setRefreshRate] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8080/registerrequests").then((res) => {
      setUserRequests(res.data);
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
          setUserRequests(res.data);
        });
      });
  };

  const deleteRequest = (user) => {
    axios
      .delete(`http://localhost:8080/deleteregisterrequest/${user.id}`)
      .then(() => {
        axios.get("http://localhost:8080/registerrequests").then((res) => {
          setUserRequests(res.data);
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/auth/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {userRequests.map((user) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <span>{user.namesurname}</span>
            <span>{user.companyname}</span>
            <span>{user.phoneNumber}</span>
            <span>{user.companyType}</span>
            <button onClick={() => approveRequest(user)}>Approve</button>
            <button onClick={() => deleteRequest(user)}>Delete</button>
          </div>
        );
      })}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default AdminUI;
