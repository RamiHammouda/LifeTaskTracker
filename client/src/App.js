import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home.js"
import Admin from "./components/Admin.js"
import Error404 from "./pages/Error404";
import AddCertificate from "./components/AddCertificate.js"
import ViewCertificate from "./components/ViewCertificate.js"
import ViewAllCertificates from "./components/ViewAllCertificates.js"

import "./App.css";
import UpdateCertificate from "./components/UpdateCertificate";
import DeleteCertificate from "./components/DeleteCertificate";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/updateProfile";
import DiplomasList from "components/Profile/DiplomasList";
import JobsList from "components/Profile/JobsList";
import ProjectsList from "components/Profile/ProjectsList";
import { Container } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
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

    if (this.state.user == null) {
      return (<div></div>)
    }

    if(localStorage.getItem("user")==null){
      return(<Login />)
    }

    return (
      /* <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/add" component={AddCertificate}></Route>
      <Route exact path="/view/:hash" component={ViewCertificate}></Route>
      <Route exact component={Error404}/>
      </Switch> */
    
      <Switch>
        <Route path="/" exact>
                    <Home user={JSON.parse(localStorage.getItem("user"))} />
        </Route>
                  {/* <Route path="/profile" exact>
                    <Profile user={JSON.parse(localStorage.getItem("user"))} />
                  </Route> */}
                  <Route path="/profile/:profileUrl" exact component={Profile}/>
                  <Route path="/profile/:profileUrl/update" exact>
                    <UpdateProfile user={JSON.parse(localStorage.getItem("user"))} />
                  </Route>
                  <Route path="/profile/:profileUrl/diplomas" exact component={DiplomasList}/>
                  <Route path="/profile/:profileUrl/projects" exact>
                    <ProjectsList user={JSON.parse(localStorage.getItem("user"))}/>
                  </Route>
                  <Route path="/profile/:profileUrl/jobs" exact>
                    <JobsList user={JSON.parse(localStorage.getItem("user"))}/>
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/sign-up">
                    <SignUp />
                  </Route>
                  <Route exact path="/add" component={AddCertificate}/>
                  <Route exact path="/view/:hash" component={ViewCertificate}/>
        <Route exact component={Error404}/>
      </Switch>
     

  )
  }

  }
  getUser() {
    // console.log("entered here :) hello boi");
    fetch("http://localhost:5000/users/omar.tb")
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res });
        localStorage.setItem("user", JSON.stringify(res));
      })
      .catch(err => this.setState({ user: err }));
  }

  // componentDidMount() {
  //   this.getUser();
  // }

  x =this.getUser();
}

export default App
