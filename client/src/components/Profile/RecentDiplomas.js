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

import { loadBlockchainData, epochToDate } from "../../utils/helper"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';





function createData(image, issuer, speciality, session, fullName, birthday, birthPlace, id, nationality, status) {
    return { image, issuer, speciality, session, fullName, birthday, birthPlace, id, nationality, status };
}


// const rows = [
//     createData('esprit.jpg', "Esprit", "Systèmes informatiques et Mobiles", "Juin 2021", "Alaa Abdelbaki", "22 Juin 1998", "Gabes", 42069, "Tunisian", "success"),
//     createData('poggers.jpg', "Poggers university", "Poggers", "Juin 2017", "Alaa Abdelbaki", "22 Juin 1998", "Gabes", 4269, "Tunisian", "success"),
//     createData('kekw.jpg', "Top Kek university", "Top Kek", "Juin 2015", "Alaa Abdelbaki", "22 Juin 1998", "Gabes", 2069, "Tunisian", "danger"),
// ];

var rows = [];
var rowsy = [];



export default class RecentDiplomas extends Component {


    state = {
        loading: false,
        web3: null,
        contract: null,
        account: null,
        rows: null,

    }


    componentDidMount = async () => {
        rows=[];
        let data = await loadBlockchainData();
        this.setState({ account: (data).accounts[0], web3: (data).web3, contract: (data).instance });

        this.setState({ hash: "10" });
        let size = await this.state.contract.methods.totalCertificates().call();
        // console.log(this.state.hash);

        for (let index = 0; index <= size -1 ; index++) {
            let zz = await this.state.contract.methods.Certificates(index).call();
            console.log(zz)
            // console.log("this is zz :)");
            // console.log(zz);
            if (zz['identifiant'] === "05151511") {
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
                                                        <a
                                                            className="btn btn-round btn-success"
                                                            href={`http://localhost:3000/view/${this.state.certId}`}
                                                            type="submit">
                                                            View Certificate
                                                        </a>
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
                                <Link
                                    className="btn btn-round btn-primary"
                                    to={`/profile/${window.location.href.replace("http://localhost:3000/profile/","")}/diplomas`}
                                    >
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
