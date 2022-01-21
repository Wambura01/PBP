import React, { useState, useEffect } from "react";

import Table from "./table";
import "./bankcontainer.scss";

function BankContainer() {
  const [transactions, setTransactions] = useState();
  const [filter, setFilter] = useState("");
  const [searchColumns, setSearchColumns] = useState([
    "description",
    "category",
  ]);

  //fetch data
  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  //handle user input in search box
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  //search functionality
  const search = (rows) => {
    return rows?.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) >
          -1
      )
    );
  };

  const columns = transactions?.length > 0 && Object.keys(transactions[0]);

  return (
    <div className="content-container">
      <div className="filter-container">
        <div className="filter">
          <label className="filter-label">Filter: </label>
          <input
            className="search"
            type="text"
            value={filter}
            onChange={handleChange}
          />
        </div>
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <Table data={search(transactions)} />
    </div>
  );
}

export default BankContainer;
