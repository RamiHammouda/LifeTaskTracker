import React, { Component } from 'react'
import { Form,Button, FormGroup, Container } from "react-bootstrap";
import Header from '../components/HeaderAdmin'
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";
import { epochToDate,dateToEpoch, loadBlockchainData } from '../utils/helper';
import { Redirect } from "react-router-dom";


import Loader from "react-loader-spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";

export default class UpdateCertificate extends Component {
    state={
        hash:'',
        nom: '',
        specialite: '',
        session: '',
        dateNaissance: '',
        lieuNaissance: '',
        nationalite:'',
        cin_passport: '',
        dateRealisation: '',
        numeroDiplome: '',
        loading: false,
        web3: null, 
        contract: null, 
        account:null,
        redirect:false,
        txnHash: 0,
        blockWitnessed: 0,
    }

    componentDidMount =  async () => {
        const { match: { params } } = this.props;
        this.setState({hash: params.id})
        let data = loadBlockchainData();
          this.setState({ account: (await data).accounts[0],web3: (await data).web3,contract: (await data).instance });


          let c = await this.state.contract.methods.getCertificate(this.state.hash).call();
          let y = await this.state.contract.methods.getIssuer(this.state.hash).call();

          this.setState({
            nom: c[2],
            specialite: c[0],
            session: c[1],
            dateNaissance: epochToDate(c[3]),
            lieuNaissance: c[4],
            nationalite:c[6],
            cin_passport: c[5],
            dateRealisation: epochToDate(y[2]),
            numeroDiplome: y[3],
        })

        this.setState({loading:true})

    }

    handleSubmit = async (event) => {
        event.preventDefault();

        let transaction = await this.state.contract.methods.updateCertificate(
            this.state.hash,
                this.state.nom,
                this.state.specialite,
                this.state.session,
                dateToEpoch(new Date(this.state.dateNaissance)),
                this.state.lieuNaissance,
                this.state.cin_passport,
                this.state.nationalite,
                dateToEpoch(new Date(this.state.dateRealisation)),
                this.state.numeroDiplome
        ).send({ from: this.state.account });

        this.setState({
            txnHash: transaction.transactionHash, blockWitnessed: transaction.blockNumber,
          })

          if(this.state.txnHash !== 0)
                  {
                      this.setState({redirect:true})
                  }
    }

    render() {
        console.log(this.state)
        if(this.state.redirect===true){
            return(
                <Redirect to={`/view`} />
                )
        }else{
        if(this.state.loading===true){
        return (
            
            <div>
                <Header/>
                
                <Container>

                    <div >
                  <br/><br/>
               <Form onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>

               <FormGroup>
                <Form.Label>Nom et Prénom : </Form.Label>
                <Form.Control type="text" value={this.state.nom} onChange={event => this.setState({nom: event.target.value})} />
                </FormGroup>

                <FormGroup>
                <Form.Label>Date Naissance : </Form.Label>
                    <Form.Control name="dateNaissance" value={this.state.dateNaissance} onChange={event => this.setState({dateNaissance: event.target.value})} ></Form.Control>
                    </FormGroup>

                    <FormGroup>
                <Form.Label>Lieu de Naissance : </Form.Label>
                <Form.Control type="text" value={this.state.lieuNaissance} onChange={event => this.setState({lieuNaissance: event.target.value})}    />
                </FormGroup>

                <FormGroup>
                <Form.Label>Cin/Passport : </Form.Label>
                <Form.Control type="text" value={this.state.cin_passport} onChange={event => this.setState({cin_passport: event.target.value})}   />
                </FormGroup>

                <FormGroup>
                <Form.Label>Nationalité : </Form.Label>
                <Form.Control type="text" value={this.state.nationalite} onChange={event => this.setState({nationalite: event.target.value})} />
                </FormGroup>

                
                <FormGroup>
                <Form.Label>Specialité : </Form.Label>
                <Form.Control as="select" selected={this.state.specialite} onChange={event => this.setState({specialite: event.target.value})}>
                <option></option>
                <option>Informatique</option>
                <option>Electromécanique</option>
                <option>Génie Civil</option>
                </Form.Control>
                </FormGroup>

                <FormGroup>
                <Form.Label>Session : </Form.Label>
                <Form.Control type="text" value={this.state.session} onChange={event => this.setState({session: event.target.value})} ></Form.Control>
                </FormGroup>

                <FormGroup>
                <Form.Label>Date Realisation Diplome : </Form.Label>
                    <Form.Control  name="dateRealisation" value={this.state.dateRealisation} onChange={event => this.setState({dateRealisation: event.target.value})} ></Form.Control>
                    </FormGroup>


                    <FormGroup>
                <Form.Label>Numéro Diplome : </Form.Label>
                <Form.Control type="text" value={this.state.numeroDiplome} onChange={event => this.setState({numeroDiplome: event.target.value})}  />
                </FormGroup>  
                
                    <FormGroup>
                    <Button type="submit" variant="primary" size="lg" block>Update Certificate</Button>
                </FormGroup>

                </Form>
                </div>
                </Container>



                <Footer/>
                <LoginRegister/>
            </div>
        )}else{
            return(
                <div>
                <div className="border border-light p-3 mb-4" style={{height:'100vh'}}>
                <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
                <Loader visible={!this.state.loading} type="Rings" color="#007bff" height={200} width={200} timeout={5000} />
                </div>
                </div>
                </div>
            )
        }
    }
    }
}