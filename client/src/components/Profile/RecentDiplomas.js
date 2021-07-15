import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,

    CardBody, CardHeader,

    CardTitle,

    Col, Row
} from "reactstrap";
import { epochToDate, loadBlockchainData } from "../../utils/helper";







var rows = [];


export default class RecentDiplomas extends Component {


    state = {
        loading: false,
        web3: null,
        contract: null,
        account: null,
        rows: null,
        userid:''
    }


    componentDidMount = async () => {
        this.setState({userid:this.props.user._id})
        rows=[];
        let data = await loadBlockchainData();
        this.setState({ account: (data).accounts[0], web3: (data).web3, contract: (data).instance });

        let size = await this.state.contract.methods.totalCertificates().call();

        for (let index = 0; index <= size -1 ; index++) {
            let zz = await this.state.contract.methods.Certificates(index).call();
            console.log(zz)
            // console.log("this is zz :)");
            // console.log(zz);
            if (zz['userid'] === this.props.user._id) {
                let y = await this.state.contract.methods.Issuers(index).call();
                console.log(y)
                // console.log("success pog");
                // console.log(y);
                let certificate = {
                    "nom": zz['Nom'],
                    "specialite": zz['Specialite'],
                    "session": zz['Session'],
                    "dateNaissance": epochToDate(zz['dateNaissance']),
                    "lieuNaissance": zz['lieuNaissance'],
                    "nationalite": zz['Nationalite'],
                    "cin_passport": zz[5],
                    "dateRealisation": epochToDate(zz['dateRealisation']),
                    "numeroDiplome": zz['numCertificat'],
                    "issuer" : y[1],
                    "certId" : index,
                }
                this.setState({'certId':index})
                rows.push(certificate);
                // console.log(zz);
            } else {
                // console.log("fail :(");
            }

        }
        this.setState({
            rows: rows,
        })
    }


    render() {
        
        return (
            <div>
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Certificates</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {/* Add form here if u wanted to add idk */}
                        <Row>
                            <Col sm="12">
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>Issuer</TableCell>
                                                <TableCell>Speciality</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice(0,3).map((row,index) => (
                                                <TableRow key={row.certId}>
                                                    <TableCell component="th" scope="row">
                                                        {/* fix later bellehy la tensa */}
                                                        {/* <img src={require(`assets/img/${row.image}`)} alt={row.image} height="50" width="50" /> */}
                                                        <img src={"http://localhost:3000/img/esprit.jpg"} height="50" width="50" alt="henlo" />
                                                        {/* {row.image} */}
                                                    </TableCell>
                                                    <TableCell align="left">{row.issuer}</TableCell>
                                                    <TableCell align="left">{row.specialite}</TableCell>
                                                    <TableCell align="left">
                                                        <Link className="btn btn-round btn-success" to={{
                                                            pathname:"/view/",
                                                            state:{params:{id:this.state.certId}}
                                                        }}>
                                                        View Certificate
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <div className="ml-auto mr-auto">
                                <Link className="btn btn-round btn-primary" to={{
                                                            pathname:`/profile/${window.location.href.replace("http://localhost:3000/profile/","")}/diplomas`,
                                                            state:{params:{id:this.state.userid}}
                                                        }}>
                                                        View All
                                                        </Link>
                            </div>
                        </Row>
                        {/* end form here */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
