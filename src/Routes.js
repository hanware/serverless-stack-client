import React from "react";
import { Route, Switch } from "react-router-dom";
import AddDealership from "./containers/dealerships/AddDealership";
import ViewDealership from "./containers/dealerships/ViewDealership";
import ListDealerships from "./containers/dealerships/ListDealerships";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AddDealer from "./containers/dealer/AddDealer";
import ViewDealer from "./containers/dealer/ViewDealer";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <ListDealerships />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dealership">
        <AddDealership />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dealership">
        <AddDealership />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dealership/:id/">
        <ViewDealership />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dealer/:id/">
        <ViewDealer />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dealer/">
        <AddDealer />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
