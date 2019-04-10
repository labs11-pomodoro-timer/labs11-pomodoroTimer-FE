import React, { Component, history } from 'react';
import './App.css';
import { Auth0Lock } from "auth0-lock";
import Billing from './components/billing/billing';


import Authenticate from './components/authentication/authentication'

import Profile from "./components/profile/profile";

// import UserListView from './dummy-display/userListView';
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
          {/* <div className="name-container">
            <UserListView />
          </div> */}
        </div>
      </Router>
    )
  } 
}
export default Authenticate(App);