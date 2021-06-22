import React, { Component,Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import getWeb3 from "../getWeb3";
import Certificate from "../contracts/Certificate.json";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Form,Button, FormGroup,Spinner, Container, Row, Col } from "react-bootstrap";
import { epochToDate, loadBlockchainData } from '../utils/helper';
import background from "../assets/img/diplome_template.png"
import Header from '../components/HeaderAdmin'
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";

class ViewCertificate extends Component {
    
    
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
        z:null,
    }

    mystyle={
        backgroundImage: `url(${background})`,

  /* Full height */
  height: '100vh',
  width: 'auto',

  /* Center and scale the image nicely */
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
    }

   
    componentDidMount =  async () => {
        const { match: { params } } = this.props;
        this.setState({hash: params.hash})

        let data = loadBlockchainData();
          this.setState({ account: (await data).accounts[0],web3: (await data).web3,contract: (await data).instance });

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
                nationalite:c[6],
                cin_passport: c[5],
                dateRealisation: epochToDate(y[2]),
                numeroDiplome: y[3],
            })
            
            

            for (let index = 0; index <= this.state.hash; index++) {
                let zz = await this.state.contract.methods.Certificates(index).call();

                if(zz['identifiant']==="09855692")
                {
                    console.log(zz);
                }
                
            }
            

    }

    

    render() {
        //console.log(this.state)
        return (
            <div >
                <Fragment>
                <Header/>

                <Container style={this.mystyle} >
               
                    <div >
                  
               <Form style={{textAlign: 'center'}}>
                   
            
               <br/><br/>
               <br/><br/>
               <Row >
                   <Col style={{textAlign: 'center'}}>
                    <h2>DIPLÔME</h2><br/>
                    <h2>Le DIPLÔME National d'ingénieur</h2>
                    </Col>
                </Row>
               <br/><br/>
               <br/><br/>
                <Row>
                    <Col className="offset-1" xs="auto" >
                <Form.Label>Specialité : </Form.Label>
                <Form.Control type="text" value={this.state.specialite} readOnly></Form.Control>
                </Col>
                <Col xs="auto" className="offset-1">
                <Form.Label>Session : </Form.Label>
                <Form.Control type="text" value={this.state.session} readOnly></Form.Control>
                </Col>
                
                </Row>
                <br/><br/>
              
                <Row>
                <Col xs="auto" className="offset-1">
                <Form.Label>Nom et Prénom : </Form.Label>
                <Form.Control type="text" value={this.state.nom} readOnly/>
                </Col>
                </Row>

                <br/><br/>
               

                <Row>

                <Col xs="auto" className="offset-1" >
                <Form.Label>Date Naissance : </Form.Label>
                    <Form.Control name="dateNaissance" value={this.state.dateNaissance} readOnly></Form.Control>
                    </Col>

                    <Col xs="auto" >
                <Form.Label>Lieu de Naissance : </Form.Label>
                <Form.Control type="text" value={this.state.lieuNaissance}   readOnly />
                </Col>


               
                    <Col xs="auto" >
                <Form.Label>Cin/Passport : </Form.Label>
                <Form.Control type="text" value={this.state.cin_passport}  readOnly />
                </Col>
                

                    <Col xs="auto" >
                <Form.Label>Nationalité : </Form.Label>
                <Form.Control type="text" value={this.state.nationalite} readOnly/>
                </Col>
                
                </Row>
                <br/><br/>
               

                <Row>
                    <Col xs="auto" className="offset-1">
                <Form.Label>Date Realisation Diplome : </Form.Label>
                    <Form.Control  name="dateRealisation" value={this.state.dateRealisation} readOnly></Form.Control>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs="auto" className="offset-1">
                <Form.Label>Numéro Diplome : </Form.Label>
                <Form.Control type="text" value={this.state.numeroDiplome}  readOnly/>
                </Col>
                </Row>

               
               

                </Form>
                </div>
                </Container>


                <Footer/>
                <LoginRegister/>
                </Fragment>
              
            </div>
        )
    }
    
}

export default ViewCertificate
