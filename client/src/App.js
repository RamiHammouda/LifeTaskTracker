import React, { Component } from "react";
import Certificate from "./contracts/Certificate.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/updateProfile";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import AddCertificate from "./components/AddCertificate.js"
import ViewCertificate from "./components/ViewCertificate.js"
import DiplomasList from "components/Profile/DiplomasList";
import JobsList from "components/Profile/JobsList";
import ProjectsList from "components/Profile/ProjectsList";





class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null, account: null};

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
  //     this.setState({ 'account': accounts[0] });
  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = Certificate.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       Certificate.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //   let date = (new Date()).getTime();
  //   let UnixTimestamp = date / 1000;
  //   await contract.methods.issueCertificate("Test", "Trabelsi Omar", "Informatique", "Principale", 123456, "Tunisie", "09855692", "Tunisien", 123456, "0554/2020").send({ from: accounts[0] });
  //   // Stores a given value, 5 by default.
  //   //await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   //const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   //this.setState({ storageValue: response });
  // };


  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  getUser() {
    // console.log("entered here :) hello boi");
    fetch("http://localhost:5000/users/6035037c49f6b243b4357f7a")
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

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    if (this.state.user == null) {
      return (<div></div>)
    }

    if(localStorage.getItem("user")==null){
      return(<Login />)
    }

    return (
      <div className="App">
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p> */}

        <Router>
          <Navbar />
          <Container>
            <Row>
              <Col>
                <Switch>
                  <Route path="/" exact>
                    <Home user={JSON.parse(localStorage.getItem("user"))} />
                  </Route>
                  <Route path="/profile" exact>
                    <Profile user={JSON.parse(localStorage.getItem("user"))} />
                  </Route>
                  <Route path="/profile/update" exact>
                    <UpdateProfile user={JSON.parse(localStorage.getItem("user"))} />
                  </Route>
                  <Route path="/profile/diplomas" exact component={DiplomasList}/>
                  <Route path="/profile/projects" exact>
                    <ProjectsList user={JSON.parse(localStorage.getItem("user"))}/>
                  </Route>
                  <Route path="/profile/jobs" exact>
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
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>

      </div >
    );
  }
}

export default App;
