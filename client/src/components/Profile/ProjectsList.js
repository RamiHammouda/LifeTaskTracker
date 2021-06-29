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

import { Link } from 'react-router-dom';


var projects = []

export default class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: null,
            full: false
        }
    }

    getProjects(id) {
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://192.168.1.17:5000/projects/" + id)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    full: true,
                })
                projects = res;
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
                console.log("length is " + projects.length());
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
            })
            .catch(err => this.setState({ user: err }));
    }

    componentDidMount() {
        // console.log(this.props.user);
        this.getProjects(this.props.user._id);
        // console.log(this.state.jobs);

    }

    render() {
        return (
            <div>
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Personal Projects</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {/* Add form here if u wanted to add idk */}
                        <Row>
                            <Col sm="12">
                                <ul className="list-unstyled team-members">
                                    {projects.map((project) => (
                                        <li key={project._id}>
                                            <Row>
                                                <Col md="9" xs="9">
                                                    <Link to="#">{project.title}</Link> <br />
                                                    <span className="text-muted">
                                                        <small>2010-2015</small>
                                                    </span>
                                                </Col>
                                                <Col className="text-right" md="3" xs="3">
                                                <a
                                                        className="btn btn-outline-success btn-round btn-icon"
                                                        // color="primary"
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        size="m">
                                                        <i className="fa fa-github" />
                                                    </a>
                                                </Col>
                                            </Row>
                                        </li>
                                    ))}
                                </ul>

                            </Col>
                        </Row>
                        
                        {/* end form here */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
