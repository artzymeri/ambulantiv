import React from "react";
import "@/styling/adminsidebar.css";

const AdminSideBar = () => {
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
      <div className="sidebar-wide shadow-one">
        <h3 className="sidebar-wide-title">Admin Panel</h3>
        <div className="horizontal-line"></div>
        <div className="sidebar-wide-navbuttons">
          {sidebarOptions.map((option) => {
            if (option.displayName == "Llogaritë e regjistruara") {
              return <h5 className="active-option">{option.displayName}</h5>;
            } else {
              return <h5>{option.displayName}</h5>;
            }
          })}
        </div>
        <button className="sidebar-wide-logout">SHKYÇU</button>
      </div>
    </>
  );
};

export default AdminSideBar;
