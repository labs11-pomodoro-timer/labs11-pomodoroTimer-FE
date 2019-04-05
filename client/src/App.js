import React, { Component } from 'react';
import './App.css';
import { Auth0Lock } from "auth0-lock";
import Billing from './components/billing/billing';


import Authenticate from './components/authentication/authentication'

import Profile from "./components/profile/profile";

import UserListView from './dummy-display/userListView';
import PremiumView from './components/billing/premiumView';


class App extends Component {
  
  render() {
    
    
    return (
      <div className="App">
        <Profile />
        <PremiumView />
        <div className="name-container">
          <UserListView />
        </div>
        <Billing />
      </div>
      
    )
  } 
}
export default Authenticate(App);