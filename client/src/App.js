import React, { Component, history } from 'react';
import './App.css';
// import { Auth0Lock } from "auth0-lock";
import Billing from './components/account_settings/account_settings.js';


import Authenticate from './components/authentication/authentication.js'

import Profile from "./components/profile/profile.js";

// import PremiumView from './components/billing/premiumView';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'


class App extends Component {

  logout = () => {
    window.localStorage.clear();
    window.location.reload();
    history.push('/');
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav-bar">
            <NavLink exact to='/' className="links" >
              Profile
            </NavLink>

            <NavLink exact to='/billing' className="links" >
              Billing
            </NavLink>

            <NavLink exact to='/settings' className="links" >
              Settings
            </NavLink>

            <NavLink to='/' className="links" onClick={this.logout} >
              Logout
            </NavLink>
          </div>
          <Route exact path='/' component={Profile} />
          {/* premiumview not ready */}
          {/* <PremiumView /> */}
          <Route exact path='/billing' component={Billing} />
        </div>
      </Router>
    )
  } 
}
export default Authenticate(App);