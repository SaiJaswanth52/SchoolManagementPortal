// DataFetch.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const DataFetch = (url, searchParam) => (WrappedComponent) => {
  return function WithDataFetch(props) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };

    const handleSearch = async (e) => {
      setSearch(e.target.value);
      if (e.target.value === "") {
        fetchData();
      } else {
        try {
          const response = await axios.get(
            `${url}?${searchParam}=${e.target.value}`
          );
          setData(response.data);
        } catch (error) {
          console.error("Error in fetching data", error);
          setData([]);
        }
      }
    };

    return (
      <WrappedComponent
        data={data}
        search={search}
        onSearch={handleSearch}
        {...props}
      />
    );
  };
};

export default DataFetch;
