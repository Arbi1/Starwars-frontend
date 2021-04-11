import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { history } from "./history";
import MainPage from "./components/MainPage";

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
