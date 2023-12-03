import React, { useState } from "react";
import "@/styling/adminsidebar.css";
import "@/styling/global.css";
import { CloseFullscreen, LogoutOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const PranuesSideBar = (props) => {
  const router = useRouter();

  const { display, closeSidebar } = props;

  const isActive = (path) => {
    return router.pathname === path ? "active-option" : "";
  };

  const goToPath = (path) => {
    router.push(path);
  };

  const handleClick = (path) => () => {
    goToPath(path);
  };

  const logout = () => {
    localStorage.removeItem("pranuesToken");
    router.push("/auth/login");
  };

  const sidebarOptions = [
    {
      id: 1,
      displayName: "Llogaritë e regjistruara",
      pathOnClick: "/admin/registeredusers",
    },
    {
      id: 2,
      displayName: "Kërkesat për regjistrim",
      pathOnClick: "/admin/usersrequests",
    },
  ];

  return (
    <>
      <div className="sidebar-wide">
        <h3 className="sidebar-wide-title">Admin Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-wide-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-wide-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
      <div className="sidebar-fullscreen" style={{ display: display }}>
        <CloseFullscreen
          onClick={closeSidebar}
          style={{
            color: "white",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
        <h3 className="sidebar-fullscreen-title">Admin Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-fullscreen-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-fullscreen-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
    </>
  );
};

export default PranuesSideBar;
