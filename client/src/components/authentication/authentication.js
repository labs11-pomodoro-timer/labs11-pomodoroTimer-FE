import React, { Component } from "react";
import Profile from "../profile/profile";

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
        loggedIn ? <Profile /> : <App />
      )
      }
    }


export default Authenticate;