import React from "react";
import "@/styling/adminsidebar.css";
import "@/styling/global.css";
import { LogoutOutlined, MenuIcon, MenuOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const AdminSideBar = () => {
  const router = useRouter();

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
    localStorage.removeItem("adminToken");
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
      <div className="sidebar-narrow">
        <MenuOutlined />
        <h3 className="sidebar-narrow-title">Admin Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-narrow-navbuttons">
          {sidebarOptions.map((option) => (
            <h5 className={isActive(option.pathOnClick)}>
              {option.displayName}
            </h5>
          ))}
        </div>
        <button className="sidebar-narrow-logout" onClick={logout}>
          <LogoutOutlined /> SHKYÇU
        </button>
      </div>
    </>
  );
};

export default AdminSideBar;
