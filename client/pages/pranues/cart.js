import AuthenticatorChecker from "@/components/Checkers/AuthenticatorChecker";
import PranuesChecker from "@/components/Checkers/PranuesChecker";
import CartView from "@/components/Pranues/CartView";
import PranuesSideBar from "@/components/Pranues/PranuesSideBar";
import { Menu } from "@mui/material";
import React, { useState } from "react";

const Products = () => {
  const [display, setDisplay] = useState("none");

  const openSidebar = () => {
    setDisplay("flex");
  };

  const closeSidebar = () => {
    setDisplay("none");
  };

  return (
    <AuthenticatorChecker>
      <PranuesChecker>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "clip",
          }}
        >
          <PranuesSideBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <CartView openSidebar={openSidebar} />
            <div className="sidebar-pranues-trigger-wrapper">
              <button
                className="sidebar-pranues-trigger-button shadow-one"
                onClick={openSidebar}
              >
                <Menu style={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </PranuesChecker>
    </AuthenticatorChecker>
  );
};

export default Products;
