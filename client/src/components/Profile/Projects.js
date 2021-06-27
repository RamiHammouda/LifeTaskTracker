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

export default class Projects extends Component {
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
                                    <li>
                                        <Row>
                                            <Col md="9" xs="9">
                                                <Link to="#">React Project</Link> <br />
                                                <span className="text-muted">
                                                    <small>2010-2015</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm">
                                                    <i className="fa fa-github" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="9" xs="9">
                                                <Link to="#">Flutter Project</Link> <br />
                                                <span className="text-muted">
                                                    <small>2010-2015</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm">
                                                    <i className="fa fa-github" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="9" xs="9">
                                                <Link to="#">Blockchain Project</Link> <br />
                                                <span className="text-muted">
                                                    <small>2010-2015</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm">
                                                    <i className="fa fa-github" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>

                            </Col>
                        </Row>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit">
                                    View All
                                                    </Button>
                            </div>
                        </Row>
                        {/* end form here */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
