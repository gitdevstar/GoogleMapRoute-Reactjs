import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from './container/MainPage';

export default function MainRoutes() {
  return (
    
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      
  );
}