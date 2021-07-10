import {
    Card,
    CardBody,
    CardFooter,
    Row,
    Col,
} from "reactstrap";
import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom';


// const baseUrl = "assets/img/";

// var image = "";

export default class UserCard extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.goToSocial = this.goToSocial.bind(this);
    //     image = baseUrl+this.props.user.profilePicture;
    //   }


    //   goToSocial(social) {
    //     preventDefault();
    //     switch (social) {
    //         case "facebook":
    //             window.location.href = 'http://www.facebook.com/'+this.props.user.facebook;
    //             break;
    //         case "twitter":
    //             window.location.href = 'http://www.twitter.com/'+this.props.user.twitter;
    //             break;
    //         case "linkedin":
    //             window.location.href = 'http://www.linkedin.com/'+this.props.user.linkedin;
    //             break;
    //         default:
    //             window.location.href = 'http://www.google.com/'+link;
    //     }
    //     window.location.href = 'http://google.com';
    // }


    componentWillMount() {
        // console.log(this.props.user)
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <Card className="card-user">
                    <div className="image">
                        <img
                            alt="..."
                            src={"http://localhost:3000/img/damir-bosnjak.jpg"}
                        />
                    </div>
                    <CardBody>
                        <div className="author">
                            <img
                                alt="..."
                                className="avatar border-gray"
                                // src={require("assets/img/henlo.png")}
                                src={`http://localhost:3000/img/profilePictures/${this.props.user.profilePicture}`}
                            />
                            <h5 className="title"><Link to={`/profile/${this.props.user.profileId}`}>{this.props.user.name} {this.props.user.lastName}</Link></h5>
                            {/* <h5 className="title">Alaa Abdelbaki</h5> */}

                            <p className="description">{this.props.user.city}, {this.props.user.country}</p>
                        </div>
                        <br />
                        <p className="description text-center">
                            <b>{this.props.user.bio}</b>
                        </p>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                {(!window.location.href.includes("/update") && this.props.user.profileId === JSON.parse(localStorage.getItem("user"))[0].profileId) &&
                                    <Link
                                        to={`/profile/${this.props.user.profileId}/update`}
                                        className="btn btn-primary btn-round"
                                        type="submit">
                                        Update Profile
                                    </Link>
                                }
                            </div>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <hr />
                        <div className="button-container">
                            <Row>
                                {(this.props.user.facebook!="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Facebook <br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            // color="primary"
                                            href={"https://www.facebook.com/" + this.props.user.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="md">
                                            <i className="fa fa-facebook" />
                                        </a>
                                    </h5>
                                </Col>}
                                {(this.props.user.linkedin!="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Linkedin<br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            color="primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={"https://www.linkedin.com/in/" + this.props.user.linkedin}
                                            size="md">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                    </h5>
                                </Col>}

                                {(this.props.user.twitter!="undefined") && 
                                    <Col className="ml-auto" lg="4" md="12" xs="4">
                                    <h5>
                                        Twitter <br />
                                        <a
                                            className="btn btn-outline-primary btn-round btn-icon"
                                            color="primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={"https://www.twitter.com/" + this.props.user.twitter}
                                            size="md">
                                            <i className="fa fa-twitter" />
                                        </a>
                                    </h5>
                                </Col>}
                            </Row>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }



}
