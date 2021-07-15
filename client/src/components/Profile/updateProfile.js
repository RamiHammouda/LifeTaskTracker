import { Container } from "@material-ui/core";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
// reactstrap components
import {
    Card,

    CardBody, CardHeader,

    CardTitle,

    Col, Row
} from "reactstrap";
import UpdateFrom from "./UpdateFrom";
import UpdateJobs from "./UpdateJobs";
import UpdateProjects from "./UpdateProjects";
import UserCard from "./UserCard";







// const classes = useStyles();

class User extends React.Component {

    // constructor(){
    //     super();
    //     this.state = {
    //         classes : useStyles(),
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = { user: null, allow: false };
    }

    getUser() {
        // console.log("entered here :) hello boi");
        fetch(`http://localhost:5000/user/${window.location.href.replace("http://localhost:3000/profile/", "").replace("/update", "")}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ user: res[0] });
                // localStorage.setItem("user", JSON.stringify(res));
            })
            .catch(err => this.setState({ user: err }));
    }


    componentDidMount() {

        this.getUser();
    }


    render() {
        console.log(this.state.user)
        
        // const classes = useStyles();

        if (this.state.user == null) {
            return (<div></div>)
        }
        
            return (
                <Container>
                    <br />
                    <div className="content">
                        <Row>
                            {/* Basic user info */}
                            <Col md="4">
                                <UserCard user={this.props.user} profile={this.state.user} />
                                {/* <RecentDiplomas /> */}
                            </Col>
                            {/* Edit Profile */}
                            <Col md="8">
                                <Card className="card-user">
                                    <CardHeader>
                                        <CardTitle tag="h5">Update Details</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Tabs defaultActiveKey="basicInfo" id="uncontrolled-tab-example">
                                            <Tab title="Basic Info" eventKey="basicInfo">
                                                <UpdateFrom user={this.props.user} />
                                            </Tab>
                                            <Tab title="Projects" eventKey="projects">
                                                <UpdateProjects user={this.props.user} />
                                            </Tab>
                                            <Tab title="Job Experience" eventKey="jobs">
                                                <UpdateJobs user={this.props.user} />
                                            </Tab>
                                        </Tabs>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            );
        
    }
}

export default User;


