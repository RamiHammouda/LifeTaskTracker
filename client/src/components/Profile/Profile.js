
import React, { Fragment } from "react";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import LoginRegister from "../../components/LoginRegister";
// reactstrap components
import {
    Row,
    Col,
} from "reactstrap";

import UserCard from "./UserCard";
// import RecentDiplomas from "./RecentDiplomas";
import RecentDiplomas from "./RecentDiplomas";
import WorkExp from "./WorkExp";
import Projects from "./Projects";

import { Container } from "@material-ui/core";


// const classes = useStyles();

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: null, };
    }

    render() {
        if (this.state.user == null) {
            this.getUser(this.props.match.params.profileUrl);
            console.log(this.state.user);
            if(this.state.user === []){
                return(<div>User not found</div>);
            }
            return (<>hai :)</>);
        } else {

            return (
                <Fragment>
                    <Header />
                    <Container>
                        <br />
                        <div className="content">
                            <Row>
                                {/* Basic user info */}
                                <Col md="4">
                                    <UserCard user={this.state.user[0]} />
                                    {/* <RecentDiplomas/> */}
                                </Col>
                                {/* Edit Profile */}
                                <Col md="8">
                                    <Row>
                                        <Col sm="12">
                                            <RecentDiplomas />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <WorkExp user={this.state.user[0]} />
                                        </Col>
                                        <Col md="6">
                                            <Projects user={this.state.user[0]} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Footer />
                    <LoginRegister />
                </Fragment>

            );
        }
    }

    getUser(profileId) {
        // console.log("entered here :) hello boi");
        fetch("http://localhost:5000/users/" + profileId)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ user: res });
                // console.log(this.state.user);
                // localStorage.setItem("user", JSON.stringify(res));
            })
            .catch(err => this.setState({ user: err }));
    }
}


