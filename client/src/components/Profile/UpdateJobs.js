import { withSnackbar } from 'components/Snackbar';
import React, { Component } from 'react'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';


import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

var jobs=[];

const columns = [{
    dataField: 'title',
    text: 'Job Title'
}, {
    dataField: 'update',
    text: 'Update'
}, {
    dataField: 'delete',
    text: 'Delete'
}];

export class UpdateJobs extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.user._id,
            title: this.props.user.email,
            userId: this.props.user._id,
        }
        this.AddJob = this.AddJob.bind(this);
    }

    getJobs(id) {
        jobs=[];
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://localhost:5000/jobs/" + id)
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
    }

    componentDidMount() {
        // console.log(this.props.user);
        this.getJobs(this.props.user._id);
        // console.log(this.state.jobs);

    }

    AddJob() {
        // console.log("entered here !!");
        // console.log(this.props.user._id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                userId: this.state.userId,
            })
        };
        fetch(`http://localhost:5000/jobs/add/`, requestOptions)
            .then(response => {
                // console.log(response);
                console.log(requestOptions.body);
                if (response.status === 200) {
                    this.props.snackbarShowMessage(`Added Successfully !`);
                } else {
                    this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
                }
            });
        console.log("snackbar should be out !! ");
        // return (
        //     // <Snackbar
        //     //     // severity="success"
        //     //     // message="Updated successfully !"
        //     // />
        // )
    }

    render() {
        return (
            <div>
                <div>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label htmlFor="email">
                                        Job Title
                                </label>
                                    <Input
                                        placeholder="Job title"
                                        type="text"
                                        onChange={event => {
                                            this.setState({
                                                title: event.target.value,
                                            });
                                            // console.log("changed");
                                        }} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                <Button
                                    className="btn-round"
                                    color="success"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.AddJob();
                                    }}>
                                    Add Job
                            </Button>
                            </div>
                        </Row>
                    </Form>
                </div>
                <BootstrapTable keyField='id' data={jobs} columns={columns} />
            </div>
        )
    }
}

export default withSnackbar(UpdateJobs)
