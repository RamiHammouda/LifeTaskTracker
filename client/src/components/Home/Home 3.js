import React, { Component } from 'react'

import './Home.css';

export default class Home extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = { user: "" };
    // }

    // getName() {
    //     fetch("http://localhost:5000/users/6035037c49f6b243b4357f7a")
    //         .then(res => res.json())
    //         .then(res => {
    //             this.setState({ user: res });
    //             localStorage.setItem("user", JSON.stringify(res));
    //         })
    //         .catch(err => this.setState({ user: err }));
    // }

    // componentDidMount() {
    //     this.getName();
    // }

    render() {
        return (
            <div>
                Hello {this.props.user.password}
            </div>
        )
    }
}
