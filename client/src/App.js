import React, { Component } from 'react';
import './App.css';
import { Auth0Lock } from "auth0-lock";

// testing bootstrap
import Button from 'react-bootstrap/Button';

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

class App extends Component {
  render() {
    console.log("PROCESS: ", process.env)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Focus Timer</h1>
          {/* testing button from bootstrap */}
          <Button onClick={function() {
            lock.show()
            }} variant="primary">Login</Button>
        </header>
      </div>
    )}}

export default App;