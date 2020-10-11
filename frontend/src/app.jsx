import React from "react";
import RootRouter from "./router";
import { GlobalStyles } from "./styled";
import "./styles.css";

const App = () => {

  return (
    <GlobalStyles>
      <RootRouter />
    </GlobalStyles>
  )
};

export default App;