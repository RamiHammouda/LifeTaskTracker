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


var jobs=[]



export default class WorkExp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: null,
            full:false
        }
    }
    getJobs(id) {
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://192.168.1.17:5000/jobs/" + id)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    full: true,
                })
                jobs=res;
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
                console.log("length is "+jobs.length());
                // do not delete for some unknown reason this is what makes the code work :) :) :) 
            })
            .catch(err => this.setState({ user: err }));
    }

    componentDidMount() {
        // console.log(this.props.user);
        this.getJobs(this.props.user._id);
        // console.log(this.state.jobs);

    }

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
