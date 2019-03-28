import React, { Component } from 'react';
import './App.css';
import { Auth0Lock } from "auth0-lock";

// testing bootstrap
import Button from 'react-bootstrap/Button';
import UserListView from "./dummy-display/userListView";

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
  '2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr',
  'mjhacker.auth0.com'
);

class App extends Component {
  
  render() {
    console.log("PROCESS: ", process.env)
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          console.log(`Error: ${error}`);
          return;
        } else {
    
        console.log(authResult);
        alert("hello, " + profile.name);
    
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      }});
    });

    return (
      <div className="App">
        <header>
          <h1>Focus Timer</h1>
          {/* testing button from bootstrap */}
          <Button onClick={function() {
            lock.show()
            }} variant="primary">Login</Button>
          <div>
            <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=586899066608.590399489303"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
          </div>
        </header>
        <div className="name-container">
          <UserListView />
        </div>
      </div>
    )}}

export default App;