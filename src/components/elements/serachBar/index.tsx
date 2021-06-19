import React from "react";
import classes from "./searchBar.module.scss";

interface Props {
  onChnage: (str: string) => void;
  placeholder: string;
}

const SearchBar = (props: Props) => {
  return (
    <div className={classes.box}>
      <input
        className={classes.input}
        placeholder={props.placeholder}
        onChange={(e: any) => props.onChnage(e.target.value)}
      ></input>
      <span className={classes.img}>
        <img src="./search.svg" alt="search"></img>
      </span>
    </div>
  );
};

export default SearchBar;
