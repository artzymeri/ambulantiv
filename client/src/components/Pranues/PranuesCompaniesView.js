import React, { useEffect, useState } from "react";
import "@/styling/global.css";
import "@/styling/Pranues/pranuescompanies.css";
import axios from "axios";
import { Storage } from "@mui/icons-material";

const PranuesCompaniesView = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <>
        <div style={{ overflowY: "auto" }}>
          <div
            style={{
              width: "100%",
              background: "white",
              display: "flex",
              gap: "10px",
              border: "1px solid lightgray",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              flexShrink: "0",
              zIndex: "999",
              height: "70px",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.17em",
              fontWeight: "800",
              color: "rgb(130, 30, 30)",
            }}
          >
            <Storage sx={{ marginBottom: "2px" }} />
            Kompanitë
          </div>
          <div className="pranues-companies-parent">
            Here will come the mapping
          </div>
        </div>
      </>
    )
  );
};

export default PranuesCompaniesView;
