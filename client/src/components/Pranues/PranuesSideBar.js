import React, { useEffect, useState } from "react";
import "@/styling/Pranues/pranuessidebar.css";
import "@/styling/global.css";
import {
  AccountCircle,
  CloseFullscreen,
  History,
  Home,
  LocalGroceryStore,
  LogoutOutlined,
  ShoppingBag,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import stateStorage from "@/store";

const PranuesSideBar = (props) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      icon: <Home />,
    },
    {
      id: 2,
      displayName: "Produktet",
      pathOnClick: "/pranues/products",
      icon: <LocalGroceryStore />,
    },
    {
      id: 3,
      displayName: "Historiku i porosive",
      pathOnClick: "/pranues/orders",
      icon: <History />,
    },
  ];

  return (
    isClient && (
      <>
        <div className="sidebar-pranues-wide">
          <div className="sidebar-pranues-wide-top">
            <h3 className="sidebar-pranues-wide-title">Pranues Panel</h3>
            <div className="horizontal-line"></div>
            <div className="sidebar-pranues-wide-navbuttons">
              {sidebarOptions.map((option) => (
                <h5
                  onClick={handleClick(option.pathOnClick)}
                  className={isActive(option.pathOnClick)}
                >
                  {option.icon}
                  {option.displayName}
                </h5>
              ))}
            </div>
          </div>
          <div className="sidebar-pranues-wide-bottom">
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <button style={{ flexGrow: 1 }}>
                <AccountCircle /> Profili
              </button>
              {stateStorage.cartItems && stateStorage.cartItems.length > 0 ? (
                <button
                  style={{ flexGrow: 1 }}
                  onClick={() => {
                    router.push("/pranues/cart");
                  }}
                >
                  <ShoppingBag />
                  Shporta
                  <span className="sidebar-pranues-wide-cart-notify">
                    {stateStorage.cartItems.length}
                  </span>
                </button>
              ) : (
                <button
                  style={{ flexGrow: 1 }}
                  onClick={() => {
                    router.push("/pranues/cart");
                  }}
                >
                  <ShoppingBag />
                  Shporta
                </button>
              )}
            </div>
            <button className="sidebar-pranues-wide-logout" onClick={logout}>
              <LogoutOutlined /> SHKYÇU
            </button>
          </div>
        </div>
        <div
          className="sidebar-pranues-fullscreen"
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
          <div>
            <button
              className="sidebar-pranues-fullscreen-logout"
              onClick={logout}
            >
              <LogoutOutlined /> SHKYÇU
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default observer(PranuesSideBar);
