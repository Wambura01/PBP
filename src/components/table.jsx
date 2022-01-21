import React from "react";

import "./table.scss";

function Table({ data }) {
  const columns = data?.length > 0 && Object.keys(data[0]);

  return (
    <table className="table" cellPadding={0} cellSpacing={0}>
      <thead>
        {data?.length > 0 && (
          <tr className="row">
            {columns.map((heading) => (
              <th className="head">{heading}</th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr className="row">
            {columns.map((column) => (
              <td className="table-data">{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
