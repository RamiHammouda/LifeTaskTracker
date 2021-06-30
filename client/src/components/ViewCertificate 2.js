import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import getWeb3 from "../getWeb3";
import Certificate from "../contracts/Certificate.json";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, FormGroup, Spinner } from "react-bootstrap";
import { epochToDate, loadBlockchainData } from '../utils/helper';

class ViewCertificate extends Component {


    state = {
        hash: '',
        nom: '',
        specialite: '',
        session: '',
        dateNaissance: '',
        lieuNaissance: '',
        nationalite: '',
        cin_passport: '',
        dateRealisation: '',
        numeroDiplome: '',
        loading: false,
        web3: null,
        contract: null,
        account: null,
    }


    componentDidMount = async () => {
        const { match: { params } } = this.props;
        this.setState({ hash: params.hash })

        let data = loadBlockchainData();
        this.setState({ account: (await data).accounts[0], web3: (await data).web3, contract: (await data).instance });

        let c = await this.state.contract.methods.getCertificate(this.state.hash).call();
        let y = await this.state.contract.methods.getIssuer(this.state.hash).call();

        console.log(c)
        console.log(y)
        this.setState({
            nom: c[2],
            specialite: c[0],
            session: c[1],
            dateNaissance: epochToDate(c[3]),
            lieuNaissance: c[4],
            nationalite: c[6],
            cin_passport: c[5],
            dateRealisation: epochToDate(y[2]),
            numeroDiplome: y[3],
        })


    }



    render() {
        console.log(this.state)
        return (
            <div className="App">


                <Form >
                    <Form.Group controlId="formGroupEtudiant">
                        <Form.Label>Nom et Prénom : </Form.Label>
                        <Form.Control type="text" value={this.state.nom} readOnly />
                    </Form.Group>


                    <FormGroup>
                        <Form.Label>Date Naissance : </Form.Label>
                        <Form.Control name="dateNaissance" value={this.state.dateNaissance} readOnly></Form.Control>
                    </FormGroup>

                    <Form.Group >
                        <Form.Label>Lieu de Naissance : </Form.Label>
                        <Form.Control type="text" value={this.state.lieuNaissance} readOnly />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Cin/Passport : </Form.Label>
                        <Form.Control type="text" value={this.state.cin_passport} readOnly />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Nationalité : </Form.Label>
                        <Form.Control type="text" value={this.state.nationalite} readOnly />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Numéro Diplome : </Form.Label>
                        <Form.Control type="text" value={this.state.numeroDiplome} readOnly />
                    </Form.Group>

                    <FormGroup>
                        <Form.Label>Date Realisation Diplome : </Form.Label>
                        <Form.Control name="dateRealisation" value={this.state.dateRealisation} readOnly></Form.Control>
                    </FormGroup>


                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Specialité : </Form.Label>
                        <Form.Control type="text" value={this.state.specialite} readOnly></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Session : </Form.Label>
                        <Form.Control type="text" value={this.state.session} readOnly></Form.Control>
                    </Form.Group>


                </Form>
            </div>
        )
    }

}

export default ViewCertificate
