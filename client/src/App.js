import React, { Component } from 'react';
import './App.css';

import Authenticate from './components/authentication/authentication'

import Profile from "./components/profile/profile";


class App extends Component {
  
  render() {
    
    
    return (
      <div className="App">
        <Profile />
        </div>
      
    )
  } 
}
export default Authenticate(App);