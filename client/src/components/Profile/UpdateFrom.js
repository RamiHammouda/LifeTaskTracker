import React, { Component } from 'react'
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { withSnackbar } from "../Snackbar";
import axios from "axios";
// import countrySelect from "./input.select.country";

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

class UpdateFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.user._id,
            email: this.props.user.email,
            password: this.props.user.password,
            profilePicture: this.props.user.profilePicture,
            name: this.props.user.name,
            lastName: this.props.user.lastName,
            address: this.props.user.address,
            city: this.props.user.city,
            country: this.props.user.country,
            bio: this.props.user.bio,
            facebook: this.props.user.facebook,
            twitter: this.props.user.twitter,
            linkedin: this.props.user.linkedin,
        }
        this.updateProfile = this.updateProfile.bind(this);
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ city: val });
    }

    updateProfile() {

        const formData = new FormData();
        formData.append("profilePicture",this.state.profilePicture);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("name", this.state.name);
        formData.append("lastName", this.state.lastName);
        formData.append("address", this.state.address);
        formData.append("city", this.state.city);
        formData.append("country", this.state.country);
        formData.append("bio", this.state.bio);

        axios.post(`http://localhost:5000/users/update/${this.props.user._id}`, formData).then(res => {
            if (res.status == 200) {
                this.props.snackbarShowMessage(`Updated Successfully !`);
            }
        }).catch(err => {
            console.log(err);
            this.props.snackbarShowMessage(`Error ! Please Try again later`, "error");
        })

    }



    render() {
        // const countriesList = require("./countries.json");
        return (
            <div>
                {/* Add form here if u wanted to add idk */}
                <Form>
                    <Row>
                        {/* <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <Input
                                                        defaultValue="Alaa"
                                                        disabled
                                                        placeholder="Company"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <FormGroup>
                                                    <label>Last Name</label>
                                                    <Input
                                                        defaultValue="Abdelbaki"
                                                        placeholder="Username"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col> */}
                        <Col md="12">
                            <FormGroup>
                                <label htmlFor="email">
                                    Email address
                                </label>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    defaultValue={this.state.email}
                                    onChange={event => {
                                        this.setState({
                                            email: event.target.value,
                                        });
                                        // console.log("changed");
                                    }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                            <FormGroup>
                                <label>First Name</label>
                                <Input
                                    defaultValue={this.state.name}
                                    placeholder="Company"
                                    type="text"
                                    onChange={event => {
                                        this.setState({
                                            name: event.target.value,
                                        });
                                        // console.log("changed");
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                                <label>Last Name</label>
                                <Input
                                    defaultValue={this.state.lastName}
                                    placeholder="Last Name"
                                    type="text"
                                    onChange={event => {
                                        this.setState({
                                            lastName: event.target.value,
                                        });
                                        // console.log("changed");
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Profile Picture</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={event => {
                                        const file = event.target.files[0];
                                        this.setState({
                                            profilePicture: file,
                                        })
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                            <FormGroup>
                                <label>Country</label>
                                {/* <Input

                                    defaultValue={this.state.city}
                                    placeholder="City"
                                    type="text"
                                    onChange={event => {
                                        this.setState({
                                            city: event.target.value,
                                        });
                                        // console.log("changed");
                                    }}
                                /> */}
                                <CountryDropdown
                                    className="form-control"

                                    value={this.state.country}
                                    onChange={(val) => this.selectCountry(val)} />

                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                                <label>City</label>
                                {/* <Input
                                    defaultValue={this.state.country}
                                    placeholder="Country"
                                    type="select"
                                    onChange={event => {
                                        this.setState({
                                            country: event.target.value,
                                        });
                                        // console.log(this.state.country);
                                    }}>
                                </Input> */}
                                <RegionDropdown
                                    className="form-control"
                                    country={this.state.country}
                                    value={this.state.city}
                                    onChange={(val) => this.selectRegion(val)} />
                                {/* <countrySelect/> */}

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>About Me</label>
                                <Input
                                    type="textarea"
                                    defaultValue={this.state.bio}
                                    onChange={event => {
                                        this.setState({
                                            bio: event.target.value,
                                        });
                                        // console.log("changed");
                                    }}
                                />

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-facebook" /> Facebook</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled defaultValue="facebook.com/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.facebook} onChange={event => {
                                    this.setState({
                                        facebook: event.target.value,
                                    });
                                    // console.log("changed");
                                }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-twitter" /> Twitter</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled defaultValue="twitter.com/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.twitter} onChange={event => {
                                    this.setState({
                                        twitter: event.target.value,
                                    });
                                    // console.log("changed");
                                }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="3">
                            <h5><i className="fa fa-facebook" /> Linkedin</h5>
                        </Col>
                        <Col sm="4" lg="3">
                            <FormGroup>
                                <Input disabled value="linkedin.com/in/" />
                            </FormGroup>
                        </Col>
                        <Col sm="8" lg="6">
                            <FormGroup>
                                <Input placeholder="Profile Link" defaultValue={this.state.linkedin} onChange={event => {
                                    this.setState({
                                        linkedin: event.target.value,
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
                                    this.updateProfile();
                                }}>
                                Update Profile
                            </Button>
                        </div>
                    </Row>
                </Form>
                {/* end form here */}
            </div>
        )
    }
}

export default withSnackbar(UpdateFrom)
