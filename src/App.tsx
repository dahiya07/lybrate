import React from "react";
import MainPage from "./components/templates/MainPage";
import "./App.scss";
import Layout from "./components/layout/layout";

const App = () => {
  return (
    <Layout>
      <MainPage />
    </Layout>
  );
};

export default App;
