import React, { Component } from "react";
import { Auth0Lock } from "auth0-lock"
import Button from 'react-bootstrap/Button';
import UserListView from "../../dummy-display/userListView";
import SlackButton from "../button/slackButton";



// Auth0Lock options (testing purposes)
// var options = {
//   auth: {
//     redirectUrl: 'https://client.mjhacker.now.sh/'
//   }
// };

var options = {

};

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
    '2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr',
    'mjhacker.auth0.com',
    options
  );

class Login extends Component {
        
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
              window.location.reload();
            }});
          });
          
          return (
            <div className="App">
              <header>
                <h1>Focus Timer</h1>
                <Button onClick={function() {
                  lock.show()
                  }} variant="primary">Login</Button>
              </header>
              
            </div>
          )
        } 
      }

export default Login;