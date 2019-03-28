import React, { Component } from "react";
import Login from "../login/login";

const Authenticate = App =>
  class extends Component {
    constructor() {
      super();
      this.state = {
        loggedIn: false
      };
    }
    componentDidMount = () => {
      if (!!localStorage.getItem('profile')) {
        this.setState({
          loggedIn: (!!localStorage.getItem('profile'))
        })
      }
    }
    render() {
      const {loggedIn} = this.state;
      return(
        loggedIn ? <App /> : <Login />
      )
      }
    }


export default Authenticate;