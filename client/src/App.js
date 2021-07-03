import React, { Component } from "react";

import Home from "./components/Home.js"
import Admin from "./components/Admin.js"
import Error404 from "./pages/Error404";
import AddCertificate from "./components/AddCertificate.js"
import ViewCertificate from "./components/ViewCertificate.js"
import ViewAllCertificates from "./components/ViewAllCertificates.js"

import "./App.css";
import { Switch,Route } from "react-router-dom";
import UpdateCertificate from "./components/UpdateCertificate";
import DeleteCertificate from "./components/DeleteCertificate";

class App extends Component {
  render() {
    if (window.location.host.split(".")[0] === "admin") {

    return (
    
        <Switch>
        <Route exact path="/"  component={Admin}></Route>
        <Route exact path="/add" component={AddCertificate}></Route>
        <Route exact path="/view/:hash" component={ViewCertificate}></Route>
        <Route exact path="/view" component={ViewAllCertificates}></Route>
        <Route exact path="/update/:id" component={UpdateCertificate}></Route>
        <Route exact path="/delete/:id" component={DeleteCertificate}></Route>
        <Route exact path="/delete" component={DeleteCertificate}></Route>
        <Route exact component={Error404}/>
        </Switch>

    );
  }else{
    return (
      /* <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/add" component={AddCertificate}></Route>
      <Route exact path="/view/:hash" component={ViewCertificate}></Route>
      <Route exact component={Error404}/>
      </Switch> */
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact component={Error404}/>
      </Switch>

  );
  }
  }
}

export default App;
