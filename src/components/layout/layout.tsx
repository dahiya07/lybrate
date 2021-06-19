import React from "react";
import Header from "../elements/header";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
