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


export default class WorkExp extends Component {
    render() {
        return (
            <div>
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Work Experience</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {/* Add form here if u wanted to add idk */}
                        <Row>
                            <Col sm="12">
                                <ul className="list-unstyled team-members">
                                    <li>
                                        Francy Company <br />
                                        <span className="text-muted">
                                            <small>2020-2025</small>
                                        </span>
                                        <br />
                                    </li>
                                    <li>
                                        Other Francy Company <br />
                                        <span className="text-muted">
                                            <small>2020-2025</small>
                                        </span>
                                        <br />
                                    </li>
                                    <li>
                                        Omega Francy Company <br />
                                        <span className="text-muted">
                                            <small>2020-2025</small>
                                        </span>
                                        <br />
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit"
                                >
                                    View all
                                                    </Button>
                            </div>
                        </Row>
                        <br />
                        {/* end form here */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
