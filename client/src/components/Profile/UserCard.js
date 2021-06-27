import {
    Card,
    CardBody,
    CardFooter,
    Row,
    Col,
} from "reactstrap";
import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom';




export default class UserCard extends Component {

    // constructor() {
    //     super();
    //     this.goToSocial = this.goToSocial.bind(this);
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

    render() {
        return (
            <div>
                <Card className="card-user">
                    <div className="image">
                        <img
                            alt="..."
                            src={require("assets/img/damir-bosnjak.jpg")}
                        />
                    </div>
                    <CardBody>
                        <div className="author">
                            <img
                                alt="..."
                                className="avatar border-gray"
                                src={require("assets/img/henlo.png")}
                            />
                            <h5 className="title"><Link to="/profile">{this.props.user.name} {this.props.user.lastName}</Link></h5>
                            {/* <h5 className="title">Alaa Abdelbaki</h5> */}

                            <p className="description">@ItsAlaa</p>
                        </div>
                        <p className="description text-center">
                            {this.props.user.bio}
                        </p>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                {useLocation.pathname !== "/profile/update" &&
                                    <Link
                                        to="/profile/update"
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
                                </Col>
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
                                </Col>
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
                                </Col>
                            </Row>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}
