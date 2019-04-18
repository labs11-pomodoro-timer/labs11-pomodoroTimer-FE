import React, { Component } from "react";
import "./login.css";
import { Auth0Lock } from "auth0-lock";
import Logo from "../../assets/FINAL Focus Timer-01(trim).png";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Auth0Lock options (testing purposes)
// var options = {
//   auth: {
//     redirectUrl: 'https://client.mjhacker.now.sh/'
//   }
// };

var options = {};

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
  "2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr",
  "mjhacker.auth0.com",
  options
);

class Login extends Component {
  render() {
    // console.log("PROCESS: ", process.env);
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          // console.log(`Error: ${error}`);
          return;
        } else {
          // console.log(authResult);
          alert("hello, " + profile.name);

          localStorage.setItem("accessToken", authResult.accessToken);
          localStorage.setItem("profile", JSON.stringify(profile));
          localStorage.setItem("email", profile.email);
          localStorage.setItem("firstName", profile.given_name);
          localStorage.setItem("lastName", profile.family_name);
          window.location.reload();
        }
      });
    });

    return (
      <div className="Landing">
        <div className="header-div">
          <header className="top">
            <div className="logo">
              <img src={Logo} />
            </div>
            <Button
              onClick={function() {
                lock.show();
              }}
              variant="primary"
            >
              Login
            </Button>
          </header>
        </div>
        <div className="blurb">
          <div className="media-image">
            <img
              src="https://media.giphy.com/media/39d07hnWZ6cBW/giphy.gif"
              alt="Spider-Man"
            />
          </div>
          <div className="media-content">
            <h3 className="media-head">
              The Timer You Never Knew You Needed...
            </h3>
            <h4>UNTIL NOW</h4>
            <br/>
            <p className="media-text">
              Productivity loss is a real drag. Especially when you must dedicate your most precious resource, time. There are so many
              outside distractions that can derail you. Do not let Slack become
              one of them. Introducing Focus Timer, the application that boosts
              productivity by creating a distraction-free Slack Workspace.
            </p>
          </div>
        </div>
        <div className="comparison">
          <Card className="free" style={{ width: "20rem " }}>
            <Card.Body>
              <Card.Title>Focus Lite</Card.Title>
              <Card.Subtitle className="subtitle">
                Functionality & Performance
              </Card.Subtitle>
              <Card.Text>
                Focus Timer Lite is geared for those users who do not need all
                the bells and whistles. Users can effortlessly integrate our app
                into a Slack workspace and sets themselves in "Focus Mode."
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Focus, Long, Short break presets
                </ListGroup.Item>
                <ListGroup.Item>Easy Slack Integration</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="premium" style={{ width: "20rem " }}>
            <Card.Body>
              <Card.Title>Focus Premium</Card.Title>
              <Card.Subtitle className="subtitle">
                Performance + Customization
              </Card.Subtitle>
              <Card.Text>
                Focus Timer Premium is geared for those users that want their
                timer to be unique as they are. Users can effortlessly integrate
                our app into a Slack workspace and sets themselves in "Focus
                Mode."
              </Card.Text>
              <p>The features of Focus Lite PLUS:</p>
              <ListGroup variant="flush">
                <ListGroup.Item>Customizable themes</ListGroup.Item>
                <ListGroup.Item>Customizable timer intervals</ListGroup.Item>
                <ListGroup.Item>
                  All future feature releases at no additional charge
                </ListGroup.Item>
                <ListGroup.Item>
                  A BIG thank you & virtual Hi-Five! GO YOU!
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        <div className="bottom">
          <h3>Are You Ready?</h3>
          <p>
            Try out Focus Timer for yourself today and see how more productive
            life can be.
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
