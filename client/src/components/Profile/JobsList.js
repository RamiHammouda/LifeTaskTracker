import { Container } from "@material-ui/core";

import React, { Component } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";


var jobs = []



export default class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: null,
            user: null,
            full: false
        }
    }
    getJobs(id) {
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)

    }

    getUser() {
        // console.log("entered here :) hello boi");
        // console.log(`${window.location.href.replace("http://localhost:3000/profile/","").replace("/jobs","")}`);
        fetch(`http://localhost:5000/users/${window.location.href.replace("http://localhost:3000/profile/", "").replace("/jobs", "")}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ user: res[0] });
                fetch("http://localhost:5000/jobs/" + res[0]._id)
                    .then(res => res.json())
                    .then(res => {
                        // console.log(res);
                        this.setState({
                            full: true,
                        })
                        jobs = res;
                        // do not delete for some unknown reason this is what makes the code work :) :) :) 
                        console.log("length is " + jobs.length());
                        // do not delete for some unknown reason this is what makes the code work :) :) :) 
                    })
                    .catch(err => this.setState({ user: err }));
                // localStorage.setItem("user", JSON.stringify(res));
            })
            .catch(err => this.setState({ user: err }));
    }

    componentDidMount() {
        // console.log(this.props.user);
        this.getUser();
        // while (this.state.user != null) {
        //     console.log(this.state.user);
        //     this.getJobs(this.state.user._id);
        // }
        // console.log(this.state.jobs);

    }

    render() {

        return (
            <Container>
                <br/>
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Work Experience</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {/* Add form here if u wanted to add idk */}
                        <Row>
                            <Col sm="12">
                                {jobs.map((job) => (
                                    <ul className="list-unstyled team-members" key={job._id}>
                                        <li>
                                            {job.title} <br />
                                            <span className="text-muted">
                                                <small>2020-2025</small>
                                            </span>
                                            <br />
                                        </li>
                                    </ul>
                                ))}
                            </Col>
                        </Row>

                        <br />
                        {/* end form here */}
                    </CardBody>
                </Card>
            </Container>
        )
    }
}
