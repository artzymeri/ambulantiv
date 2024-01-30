import React, { useMemo } from "react";
import "@/styling/global.css";
import "@/styling/tablecomponent.css";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const TableComponent = (props) => {
  const {
    columns,
    rows,
    approveRequest,
    deleteRequest,
    deleteUser,
    editUser,
    searchInput,
    deleteProduct,
    handleOpenDialog,
    refreshRate,
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
  }, [searchInput, rows, refreshRate]);

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
        {columns.map((column, index) => {
          return (
            <div key={index} id={column.id}>
              {column.name}
            </div>
          );
        })}
      </div>
      <div className="table-content">
        {filteredRows && filteredRows.length == 0 ? (
          <p className="no-data-text">Nuk ka të dhëna</p>
        ) : null}
        {filteredRows.map((row) => {
          return (
            <div key={row.id} className="table-row">
              {props.productsList && (
                <>
                  <div>{row.name}</div>
                  <div>{row.category}</div>
                  <div>{row.price}€</div>
                  <div>{row.weight}</div>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <img
                          src={row.photo}
                          style={{ height: "250px", width: "auto" }}
                          loading="lazy"
                          alt={row.name}
                        />
                      </React.Fragment>
                    }
                  >
                    <div>
                      <img
                        src={row.photo}
                        style={{ height: "30px" }}
                        loading="lazy"
                        alt={row.name}
                      />
                    </div>
                  </HtmlTooltip>
                  <div>{row.distributor}</div>
                  {props.productButtons && (
                    <div className="table-row-buttons">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenDialog(row);
                        }}
                      >
                        Edito
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteProduct(row)}
                      >
                        Fshij
                      </Button>
                    </div>
                  )}
                </>
              )}
              {props.companyProductsList && (
                <>
                  <div>{row.name}</div>
                  <div>{row.category}</div>
                  <div>{row.price}€</div>
                  <div>{row.weight}</div>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <img
                          src={row.photo}
                          style={{ height: "250px", width: "auto" }}
                          loading="lazy"
                          alt={row.name}
                        />
                      </React.Fragment>
                    }
                  >
                    <div>
                      <img
                        src={row.photo}
                        style={{ height: "30px" }}
                        loading="lazy"
                        alt={row.name}
                      />
                    </div>
                  </HtmlTooltip>
                  {props.companyProductButtons && (
                    <div className="table-row-buttons">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenDialog(row);
                        }}
                      >
                        Edito
                      </Button>
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
                      <Button
                        variant="contained"
                        onClick={() => editUser(row)}
                      >
                        Edito
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteUser(row)}
                      >
                        Fshij
                      </Button>
                    </div>
                  )}
                  {props.requestsButtons && (
                    <div className="table-row-buttons">
                      <Button
                        variant="contained"
                        onClick={() => approveRequest(row)}
                      >
                        Aprovo
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteRequest(row)}
                      >
                        Fshij
                      </Button>
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
