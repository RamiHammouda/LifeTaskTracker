import { withSnackbar } from 'components/Snackbar';
import React, { Component } from 'react'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

var projects = [];

const columns = [{
    dataField: 'title',
    text: 'Project Title'
}, {
    dataField: 'link',
    text: 'Link'
}, {
    dataField: 'update',
    text: 'Update'
}, {
    dataField: 'delete',
    text: 'Delete'
}
];

const paginationOption = {
    custom: true,
    totalSize: projects.length
};


export class UpdateProjects extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.user._id,
            title: null,
            link: null,
            userId: this.props.user._id,
        }
        this.AddJob = this.AddJob.bind(this);
    }

    AddJob() {
        // console.log("entered here !!");
        // console.log(this.props.user._id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                link: this.state.link,
                userId: this.state.userId,
            })
        };
        fetch(`http://localhost:5000/projects/add/`, requestOptions)
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
    }


    getProjects(id) {
        projects = [];
        // console.log("entered here :) hello boi");
        // console.log("http://192.168.1.17:5000/jobs/" + id)
        fetch("http://localhost:5000/projects/" + id)
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
                <div>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label htmlFor="email">
                                        Project Title
                                </label>
                                    <Input
                                        placeholder="Project title"
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
                            <Col md="12">
                                <FormGroup>
                                    <label htmlFor="email">
                                        Project Link
                                </label>
                                    <Input
                                        placeholder="Project Link"
                                        type="text"
                                        onChange={event => {
                                            this.setState({
                                                link: event.target.value,
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
                <BootstrapTable keyField='id' data={projects} columns={columns} />


            </div>
        )
    }
}

export default withSnackbar(UpdateProjects)
