
import React,{Fragment} from "react";
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



    render() {
        return (
            <Fragment>
            <Header/>
            <Container>
                <br/>
                <div className="content">
                    <Row>
                        {/* Basic user info */}
                        <Col md="4">
                            <UserCard user={this.props.user}/>
                            {/* <RecentDiplomas/> */}
                        </Col>
                        {/* Edit Profile */}
                        <Col md="8">
                            <Row>
                                <Col sm="12">
                                    <RecentDiplomas/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <WorkExp user={this.props.user}/>
                                </Col>
                                <Col md="6">
                                    <Projects user={this.props.user}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Footer/>
            <LoginRegister/>
            </Fragment>
           
        );
    }
}


