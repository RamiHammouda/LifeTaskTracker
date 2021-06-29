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
import { Tooltip } from '@material-ui/core';
import { epochToDate, loadBlockchainData } from '../../utils/helper';


var certificates = [];



export default class RecentDiplomas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            contract: null,
            account: null,
            certificates: null,
        }
    }



    componentDidMount = async () => {
        let data = await loadBlockchainData();
        this.setState({ account: (data).accounts[0], web3: (data).web3, contract: (data).instance });

        this.setState({ hash: "10" });
        // console.log(this.state.hash);

        for (let index = 0; index <= this.state.hash; index++) {
            let zz = await this.state.contract.methods.Certificates(index).call();

            // console.log("this is zz :)");
            // console.log(zz);
            if (zz['identifiant'] === "13256600") {
                let y = await this.state.contract.methods.getIssuer(index).call();
                // console.log("success pog");
                // console.log(y);
                let certificate = {
                    "nom": zz[2],
                    "specialite": zz[0],
                    "session": zz[1],
                    "dateNaissance": epochToDate(zz[3]),
                    "lieuNaissance": zz[4],
                    "nationalite": zz[6],
                    "cin_passport": zz[5],
                    "dateRealisation": epochToDate(y[2]),
                    "numeroDiplome": y[3],
                    "issuer": y[1],
                    "certId": y[3],
                }
                certificates.push(certificate);
                // console.log(zz);
            } else {
                // console.log("fail :(");
            }

        }
        this.setState({
            certificates: certificates,
        })
    }


    render() {

        for (let index = 0; index < 3; index++) {
            
        }

        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Recent Diplomas</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ul className="list-unstyled team-members">
                            {certificates.slice(0,3).map((certificate)=>(
                                <li>
                                <Row>
                                    <Col md="2" xs="2">
                                        <div className="avatar">
                                            <img
                                                alt="..."
                                                className="img-circle img-no-padding img-responsive"
                                                src={require("assets/img/esprit.jpg")} />
                                        </div>
                                    </Col>
                                    <Col md="7" xs="7">
                                        <Link to="#">{certificate.specialite}</Link> <br />
                                        <span className="text-muted">
                                            <small>2017-2023</small>
                                        </span>
                                    </Col>
                                    <Col className="text-right" md="3" xs="3">
                                        <Button
                                            className="btn-round btn-icon"
                                            color="success"
                                            outline
                                            size="sm">
                                            <Tooltip title="Verified">
                                                <i className="fa fa-check" />
                                            </Tooltip>
                                        </Button>
                                    </Col>
                                </Row>
                            </li>
                            ))}
                        </ul>
                        <Row>
                            <div className="update ml-auto mr-auto">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit">
                                    View all ( 10+ )
                        </Button>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
