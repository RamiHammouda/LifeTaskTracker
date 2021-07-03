import React,{ Component,Fragment } from "react";
import Header from '../components/Header'
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";

class Home extends Component{

    render(){
        return(
            <div className="App">
                <Fragment>
                <Header/>




                <Footer/>
                <LoginRegister/>
                </Fragment>
            </div>
        )
    }
}

export default Home