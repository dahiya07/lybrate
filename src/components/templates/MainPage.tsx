import React, { useState, useEffect } from "react";
import Card from "../elements/card/card";
import classes from "./mainPage.module.scss";
import SearchBar from "../elements/serachBar";

const MainPage = () => {
  const [fullData, setFullData] = useState({} as data);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState({
    data: [],
    last_page: 0,
  } as data);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        setFullData({ data: data.data, last_page: data.total_pages });
        setFilteredData({ data: data.data, last_page: data.total_pages });
        setLoading(false);
      });
  }, []);

  const isBottom = (el: any) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById("table");
    if (isBottom(wrappedElement)) {
      console.log("header bottom reached");
      fetchMoreData();
      document.removeEventListener("scroll", trackScrolling);
    }
  };

  useEffect(() => {
    const wrappedElement = document.getElementById("table");
    if (wrappedElement) {
      if (isBottom(wrappedElement)) {
        console.log("header bottom reached");
        fetchMoreData();
      }
    }
    document.addEventListener("scroll", trackScrolling);
    return function cleanup() {
      document.removeEventListener("scroll", trackScrolling);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const fetchMoreData = () => {
    if (page < fullData.last_page) {
      fetch(`https://reqres.in/api/users?page=${page + 1}`)
        .then((response) => response.json())
        .then((data) => {
          let x = data.data;
          let oldArray = fullData.data;
          setFullData({ ...fullData, data: [...oldArray, ...x] });
          setFilteredData({
            ...filteredData,
            data: [...oldArray, ...x],
          });
          setPage(page + 1);
        });
    }
  };

  const handleChange = (str: string) => {
    let searchedArray = fullData.data.filter((elem) =>
      elem.email.includes(str)
    );
    setFilteredData({ ...filteredData, data: searchedArray });
  };

  return (
    <div className={classes.container}>
      <div className={classes.searchBox}>
        <SearchBar placeholder="Search via Email" onChnage={handleChange} />
      </div>
      {!loading ? (
        <div className={classes.cardBox} id="table">
          {filteredData.data !== undefined ? (
            filteredData.data.map((elem: IData) => (
              <Card
                key={elem.id}
                id={elem.id}
                avatar={elem.avatar}
                email={elem.email}
                first_name={elem.first_name}
                last_name={elem.last_name}
              />
            ))
          ) : (
            <div style={{ height: "550px" }}>Null value</div>
          )}
        </div>
      ) : (
        <div style={{ width: "80%", textAlign: "center" }}>
          <h5 style={{ margin: "50px auto", fontSize: "24px" }}>Loading</h5>
        </div>
      )}
    </div>
  );
};

export default MainPage;
