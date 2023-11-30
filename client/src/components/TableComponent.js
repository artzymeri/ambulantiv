import React from "react";
import "@/styling/global.css";
import "@/styling/tablecomponent.css";

const TableComponent = (props) => {
  const { columns, rows, approveRequest, deleteRequest } = props;

  return (
    <div className="table-parent shadow-one">
      <div className="table-header">
        {columns.map((column) => {
          return <div>{column.name}</div>;
        })}
      </div>
      <div className="table-content">
        {rows.map((row) => {
          return (
            <div className="table-row">
              <div>{row.namesurname}</div>
              <div>{row.companyname}</div>
              <div>{row.phoneNumber}</div>
              <div>{row.emailAddress}</div>
              <div>{row.companyType}</div>
              <div className="table-row-buttons">
                <button onClick={() => approveRequest(row)}>Aprovo</button>
                <button onClick={() => deleteRequest(row)}>Fshij</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableComponent;
