import React, { useState } from "react";
import "@/styling/Pranues/pranuessidebar.css";
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
      displayName: "Ballina",
      pathOnClick: "/pranues/home",
    },
    {
      id: 2,
      displayName: "Produktet",
      pathOnClick: "/pranues/products",
    },
    {
      id: 3,
      displayName: "Historiku i porosive",
      pathOnClick: "/pranues/orders",
    },
    {
      id: 3,
      displayName: "Shporta",
      pathOnClick: "/pranues/cart",
    },
  ];

  return (
    <>
      <div className="sidebar-pranues-wide">
        <h3 className="sidebar-pranues-wide-title">Pranues Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-pranues-wide-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-pranues-wide-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
      <div className="sidebar-pranues-fullscreen" style={{ display: display }}>
        <CloseFullscreen
          onClick={closeSidebar}
          style={{
            color: "white",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
        <h3 className="sidebar-pranues-fullscreen-title">Pranues Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-pranues-fullscreen-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-pranues-fullscreen-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
    </>
  );
};

export default PranuesSideBar;
