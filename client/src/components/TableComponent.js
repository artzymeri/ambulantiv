import React, { useMemo } from "react";
import "@/styling/global.css";
import "@/styling/tablecomponent.css";

const TableComponent = (props) => {
  const {
    columns,
    rows,
    approveRequest,
    deleteRequest,
    deleteUser,
    searchInput,
  } = props;

  function convertToPascalCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const filteredRows = useMemo(() => {
    const loweredSearchInput = (searchInput || "").toLowerCase();

    const filteredBySearch = rows.filter((row) => {
      return (
        row.namesurname.includes(loweredSearchInput) ||
        row.companyname.includes(loweredSearchInput) ||
        row.phoneNumber.includes(loweredSearchInput) ||
        row.emailAddress.includes(loweredSearchInput) ||
        row.companyType.includes(loweredSearchInput)
      );
    });

    return filteredBySearch;
  }, [searchInput, rows]);

  return (
    <div className="table-parent shadow-one">
      <div className="table-header">
        {columns.map((column) => {
          return <div id={column.id}>{column.name}</div>;
        })}
      </div>
      <div className="table-content">
        {filteredRows.map((row) => {
          return (
            <div key={row.id} className="table-row">
              <div>{row.namesurname}</div>
              <div>{row.companyname}</div>
              <div>{row.phoneNumber}</div>
              <div>{row.emailAddress}</div>
              <div>{convertToPascalCase(row.companyType)}</div>
              {props.buttonsActive ? (
                <div className="table-row-buttons">
                  <button onClick={() => approveRequest(row)}>Aprovo</button>
                  <button onClick={() => deleteRequest(row)}>Fshij</button>
                </div>
              ) : (
                <div className="table-row-buttons">
                  <button onClick={() => deleteUser(row)}>Fshij</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableComponent;
