// import React, { Component } from 'react'
// import { Button } from '../Button';
// import "./Profile.css";

// export default class Profile extends Component {
//     render() {
//         return (
//             <div className="container profile">
//                 <div className="row">
//                     <div className="col-12 col-md-3">
//                         <div className="row">
//                             <div className="col-12 d-flex justify-content-center">
//                                 <img src={window.location.origin + '/download.jpg'} alt="Profile Picture"></img>
//                             </div>
//                         </div>
//                         <div className="container user-info">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <h4>{this.props.user.name}</h4>
//                                 </div>
//                                 <div className="col-12">
//                                     <h4>{this.props.user.lastName}</h4>
//                                 </div>
//                                 <div className="col-12">
//                                     <h4>{this.props.user.email}</h4>
//                                 </div>
//                                 <div className="col-12">
//                                     <h4>Esprit</h4>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-md-9">
//                         <div className="container profile-feed">
//                             <div className="row">
//                                 <div className="col-12">
//                                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis aliquam quod doloremque magni architecto minus. Assumenda pariatur, dicta dolore porro, quasi nam ea consectetur excepturi laborum modi ut obcaecati cumque!
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Row,
    Col,
} from "reactstrap";

import UserCard from "./UserCard";
import RecentDiplomas from "./RecentDiplomas";
import DiplomasList from "./DiplomasList";
import WorkExp from "./WorkExp";
import Projects from "./Projects";

// const classes = useStyles();

export default class User extends React.Component {

    // constructor(props){
    //     super(props);
    //     // this.state = {user: null};
    // }   

    // getName(){
    //     fetch("http://localhost:5000/users/6035037c49f6b243b4357f7a")
    //         .then(res=>res.json())
    //         .then(res=>this.setState({user : res}))
    //         .catch(err=>this.setState({user: err}));
    // }
    
    // componentDidMount(){
    //    this.getName();
    // }
    

    // constructor(){
    //     super();
    //     this.state = {
    //         classes : useStyles(),
    //     }
    // }


    render() {

        // const classes = useStyles();
        // if(!this.state.user){
        //     return (<div>:)</div>)
        // }
        return (
            
            <>
                <div className="content">
                    <Row>
                        {/* Basic user info */}
                        <Col md="4">
                            <UserCard user={this.props.user}/>
                            <RecentDiplomas/>
                        </Col>
                        {/* Edit Profile */}
                        <Col md="8">
                            <Row>
                                <Col sm="12">
                                    <DiplomasList/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <WorkExp user={this.props.user}/>
                                </Col>
                                <Col md="6">
                                    <Projects/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


