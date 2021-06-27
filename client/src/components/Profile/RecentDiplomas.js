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





export default class RecentDiplomas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            contract: null,
            account: null,
        }
    }



    componentDidMount = async () => {
        // const { match: { params } } = this.props;
        // this.setState({ hash: params.hash })

        let data = loadBlockchainData();
        this.setState({ account: (await data).accounts[0], web3: (await data).web3, contract: (await data).instance });

        let c = await this.state.contract.methods.getCertificate(5).call();
        // let y = await this.state.contract.methods.getIssuer(this.state.hash).call();

        console.log(c)
        // console.log(y)
        // this.setState({
        //     nom: c[2],
        //     specialite: c[0],
        //     session: c[1],
        //     dateNaissance: epochToDate(c[3]),
        //     lieuNaissance: c[4],
        //     nationalite: c[6],
        //     cin_passport: c[5],
        //     dateRealisation: epochToDate(y[2]),
        //     numeroDiplome: y[3],
        // })


    }


    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Recent Diplomas</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ul className="list-unstyled team-members">
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
                                        <Link to="#">Esprit</Link> <br />
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
                            <li>
                                <Row>
                                    <Col md="2" xs="2">
                                        <div className="avatar">
                                            <img
                                                alt="..."
                                                className="img-circle img-no-padding img-responsive"
                                                src={require("assets/img/poggers.jpg")} />
                                        </div>
                                    </Col>
                                    <Col md="7" xs="7">
                                        <Link to="#">Pog University</Link> <br />
                                        <span className="text-muted">
                                            <small>2015-2017</small>
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
                            <li>
                                <Row>
                                    <Col md="2" xs="2">
                                        <div className="avatar">
                                            <img
                                                alt="..."
                                                className="img-circle img-no-padding img-responsive"
                                                src={require("assets/img/kekw.jpg")} />
                                        </div>
                                    </Col>
                                    <Col md="7" xs="7">
                                        <Link to="#">EzClap College</Link> <br />
                                        <span className="text-muted">
                                            <small>2010-2015</small>
                                        </span>
                                    </Col>
                                    <Col className="text-right" md="3" xs="3">
                                        <Button
                                            className="btn-round btn-icon"
                                            color="danger"
                                            outline
                                            size="sm">
                                            <Tooltip title="Not verified yet">
                                                <i className="fa fa-times" />
                                            </Tooltip>
                                        </Button>
                                    </Col>
                                </Row>
                            </li>
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
