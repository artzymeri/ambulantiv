import React, { useState } from "react";
import "@/styling/Distributor/distributorsidebar.css";
import "@/styling/global.css";
import {
  CloseFullscreen,
  LogoutOutlined,
  MenuIcon,
  MenuOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const DistributorSideBar = (props) => {
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
    localStorage.removeItem("distributorToken");
    router.push("/auth/login");
  };

  const sidebarOptions = [
    {
      id: 1,
      displayName: "Ballina",
      pathOnClick: "/distributor/home",
    },
    {
      id: 2,
      displayName: "Produktet e Listuara",
      pathOnClick: "/distributor/companyproducts",
    },
    {
      id: 3,
      displayName: "Klientët tanë",
      pathOnClick: "/distributor/clients",
    },
    {
      id: 3,
      displayName: "Porositë",
      pathOnClick: "/distributor/orders",
    },
  ];

  return (
    <>
      <div className="sidebar-distributor-wide">
        <h3 className="sidebar-distributor-wide-title">Distributor Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-distributor-wide-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-distributor-wide-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
      <div
        className="sidebar-distributor-fullscreen"
        style={{ display: display }}
      >
        <CloseFullscreen
          onClick={closeSidebar}
          style={{
            color: "white",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
        <h3 className="sidebar-distributor-fullscreen-title">
          Distributor Panel
        </h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-distributor-fullscreen-navbuttons">
          {sidebarOptions.map((option) => (
            <h5
              onClick={handleClick(option.pathOnClick)}
              className={isActive(option.pathOnClick)}
            >
              {option.displayName}
            </h5>
          ))}
        </div>
        <button
          className="sidebar-distributor-fullscreen-logout"
          onClick={logout}
        >
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
    </>
  );
};

export default DistributorSideBar;
