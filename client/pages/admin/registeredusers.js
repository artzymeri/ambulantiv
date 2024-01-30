import React, { use, useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Admin/adminsidebar.css";
import "@/styling/editdialog.css"
import axios from "axios";
import { Menu } from "@mui/icons-material";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";

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

const RegisteredUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const [isClient, setIsClient] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce-kosova-server.onrender.com/getusers")
      .then((res) => {
        setUsersData(res.data);
        setLoading(false);
      });
    setIsClient(true);
  }, []);

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

  const deleteUser = (user) => {
    setLoading(true);
    axios
      .delete(
        `https://ecommerce-kosova-server.onrender.com/deleteuser/${user.id}`
      )
      .then(() => {
        setLoading(true);
        axios
          .get("https://ecommerce-kosova-server.onrender.com/getusers")
          .then((res) => {
            setUsersData(res.data);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editUser = (user) => {
    console.log(user)
    setEditUserData(user);
    setEditUserDialog(true);
  }

  const [editUserDialog, setEditUserDialog] = useState(false);
  const [editUserData, setEditUserData] = useState(
    {
      namesurname: null,
      address: null,
      phoneNumber: null,
      companyType: null
    }
  )

  const rows = usersData;

  const [searchInput, setSearchInput] = useState("");

  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (file) => {
    const fileReader = new FileReader();
    setFile(file);
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setRegisterInfo({ ...regsiterInfo, companyLogo: e.target.result });
    };
  };

  return (
    isClient && (
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
          <title>Llogaritë e regjistuara</title>
        </Head>
        <AuthenticatorChecker>
          <AdminChecker>
            <div style={{ display: "flex", width: "100vw", height: "100dvh" }}>
              <AdminSideBar display={display} closeSidebar={closeSidebar} />
              {loading ? (
                <div className="loader-parent">
                  <span className="loader"></span>
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
                  <Dialog open={editUserDialog} onClose={()=>{
                    setEditUserData({
                      namesurname: null,
                      address: null,
                      phoneNumber: null,
                      emailAddress: null,
                      companyType: null
                    })
                    setEditUserDialog(false)
                  }}>
                    <DialogTitle>
                      Edito Userin
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        className="shadow-one"
                        label="Emri"
                        value={editUserData.namesurname}
                        onChange={(e)=>{setEditUserData({...editUserData, namesurname: e.target.value})}}
                      />
                      <TextField
                        className="shadow-one"
                        label="Adresa"
                        value={editUserData.address}
                        onChange={(e)=>{setEditUserData({...editUserData, address: e.target.value})}}
                      />
                      <TextField
                        className="shadow-one"
                        label="Numri Telefonit"
                        value={editUserData.phoneNumber}
                        onChange={(e)=>{setEditUserData({...editUserData, phoneNumber: e.target.value})}}
                      />
                      <TextField
                        className="shadow-one"
                        label="Email Adresa"
                        value={editUserData.emailAddress}
                        onChange={(e)=>{setEditUserData({...editUserData, emailAddress: e.target.value})}}
                      />
                      
                      <TextField
                        label="Atributi"
                        variant="outlined"
                        className="shadow-one"
                        fullWidth
                        select
                        autoComplete="off"
                        value={editUserData.companyType}
                        onChange={(e) =>
                          setNewProduct({ ...editUserData, companyType: e.target.value })
                        }
                      >
                        <MenuItem value={'pranues'}>
                          pranues
                        </MenuItem>
                        <MenuItem value={'distributor'}>
                          distributor
                        </MenuItem>
                      </TextField>
                      <div className="file-uploader-container-edit">
                        <FileUploader
                          multiple={false}
                          handleChange={handleFileChange}
                          name="file"
                          required={true}
                          hoverTitle="Vendose këtu"
                          label="Ngarko fotografinë ose zvarrite këtu"
                        />
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {file
                            ? `Emri i fotografisë: ${file.name}`
                            : "Asnjë fotografi nuk është ngarkuar akoma"}
                        </p>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button>
                        Mbyll
                      </Button>
                      <Button>
                        Edito
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                    deleteUser={deleteUser}
                    editUser={editUser}
                    registeredButtons={true}
                    usersList={true}
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

export default RegisteredUsers;
