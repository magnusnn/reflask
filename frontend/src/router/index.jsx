import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";
import Classifier from "../pages/Classifier";

const RootRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/classifier" component={Classifier} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default RootRouter;