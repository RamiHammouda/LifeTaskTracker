import { Container } from '@material-ui/core';
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



export default class DiplomasList extends Component {


    state = {
        loading: false,
        web3: null,
        contract: null,
        account: null,
        rows: null,
        userid:''

    }


    componentDidMount = async () => {
        this.setState({userid:this.props.location.state.params.id})
        rows=[];
        let data = await loadBlockchainData();
        this.setState({ account: (data).accounts[0], web3: (data).web3, contract: (data).instance });

        this.setState({ hash: "10" });
        // console.log(this.state.hash);
        let size = await this.state.contract.methods.totalCertificates().call();
        
        for (let index = 0; index <= size-1; index++) {
           
            let y = await this.state.contract.methods.getIssuer(index).call();
            let certs = await this.state.contract.methods.Certificates(index).call();
            
            if (certs['userid'] === this.state.userid) {
                let certificate = {
                    "nom": certs['Nom'],
                    "specialite": certs['Specialite'],
                    "session": certs['Session'],
                    "dateNaissance": epochToDate(certs['dateNaissance']),
                    "lieuNaissance": certs['lieuNaissance'],
                    "nationalite": certs['Nationalite'],
                    "cin_passport": certs['identifiant'],
                    "dateRealisation": epochToDate(y['dateRealisation']),
                    "numeroDiplome": y['numCertificat'],
                    "issuer" : y[1],
                    "certId" : certs['id'],
                }
                rows.push(certificate);
            } else {
                
            }

        }
        this.setState({
            rows: rows,
        })
    }


    render() {
        
        return (
            <Container>
                <br/>
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
                                            {rows.map((row,index) => (
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
                                                            state:{params:{id:row.certId}}
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
                        {/* end form here */}
                    </CardBody>
                </Card>
            </Container>
        )
    }
}
