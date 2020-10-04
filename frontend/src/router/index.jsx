import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Classifier from "../components/Classifier";

const RootRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/classifier" component={Classifier} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default RootRouter;