import React, { useMemo } from "react";
import "@/styling/global.css";
import "@/styling/tablecomponent.css";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";

const TableComponent = (props) => {
  const {
    columns,
    rows,
    approveRequest,
    deleteRequest,
    deleteUser,
    searchInput,
    deleteProduct,
    handleOpenDialog,
  } = props;

  function convertToPascalCase(str) {
    return str?.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const filteredRows = useMemo(() => {
    const loweredSearchInput = (searchInput || "").toLowerCase();

    const filteredBySearch = rows.filter((row) => {
      return (
        row?.namesurname?.includes(loweredSearchInput) ||
        row?.companyname?.includes(loweredSearchInput) ||
        row?.phoneNumber?.includes(loweredSearchInput) ||
        row?.emailAddress?.includes(loweredSearchInput) ||
        row?.companyType?.includes(loweredSearchInput) ||
        row?.name?.includes(loweredSearchInput) ||
        row?.price?.toString().includes(loweredSearchInput) ||
        row?.weight?.toString().includes(loweredSearchInput) ||
        row?.distributor?.includes(loweredSearchInput)
      );
    });

    return filteredBySearch;
  }, [searchInput, rows]);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      borderRadius: "10px",
      fontSize: "12px",
      border: "1px solid lightgray",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    },
  }));

  return (
    <div className="table-parent shadow-one">
      <div className="table-header">
        {columns.map((column) => {
          return <div id={column.id}>{column.name}</div>;
        })}
      </div>
      <div className="table-content">
        {!props.productsList && !props.usersList && s!props.requestsList ? (
          <p className="no-data-text">nuk ka</p>
        ) : null}
        {filteredRows.map((row) => {
          return (
            <div key={row.id} className="table-row">
              {props.productsList && (
                <>
                  <div>{row.name}</div>
                  <div>{row.price}€</div>
                  <div>{row.weight}g</div>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <img
                          src={row.photo}
                          style={{ height: "250px", width: "auto" }}
                        />
                      </React.Fragment>
                    }
                  >
                    <div>
                      <img src={row.photo} style={{ height: "30px" }} />
                    </div>
                  </HtmlTooltip>
                  <div>{row.distributor}</div>
                  {props.productButtons && (
                    <div className="table-row-buttons">
                      <button onClick={() => handleOpenDialog(row)}>
                        Edito
                      </button>
                      <button onClick={() => deleteProduct(row)}>Fshij</button>
                    </div>
                  )}
                </>
              )}
              {(props.usersList || props.requestsList) && (
                <>
                  <div>{row.namesurname}</div>
                  <div>{row.companyname}</div>
                  <div>{row.phoneNumber}</div>
                  <div>{row.emailAddress}</div>
                  {row.companyType && (
                    <div>{convertToPascalCase(row.companyType)}</div>
                  )}
                  {props.registeredButtons && (
                    <div className="table-row-buttons">
                      <button onClick={() => deleteUser(row)}>Fshij</button>
                    </div>
                  )}
                  {props.requestsButtons && (
                    <div className="table-row-buttons">
                      <button onClick={() => approveRequest(row)}>
                        Aprovo
                      </button>
                      <button onClick={() => deleteRequest(row)}>Fshij</button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableComponent;
