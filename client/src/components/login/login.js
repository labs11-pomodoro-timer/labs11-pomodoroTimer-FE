import React, { Component } from "react";
import "./login.css";
import { Auth0Lock } from "auth0-lock";
import Logo from "../../assets/FINAL Focus Timer-01(trim).png";
import mediaImage from "../../assets/rsz_1focus-timerTrim.png";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Auth0Lock options (testing purposes)
// var options = {
//   auth: {
//     redirectUrl: 'https://client.mjhacker.now.sh/'
//   }
// };

var options = {
  theme: {
    logo: Logo,
    primaryColor: "#E03616"
  },
  languageDictionary: {
    emailInputPlaceholder: "labs11@lambda.com",
    title: "Focus Timer"
  }
};

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
              <img src={Logo} alt="Focus Timer Logo" />
            </div>
            <Button
              onClick={function() {
                lock.show();
              }}
              variant="outline-primary"
            >
              Login
            </Button>
          </header>
        </div>
        <div className="blurb">
          <div className="media-image">
            <img
              src= {mediaImage}
              alt="Focus Timer iPhone Mockup"
            />
          </div>
          <div className="media-content">
            <h4 className="media-head">
              The Timer You Never Knew You Needed...
            </h4>
            <h3 className="media-subhead">UNTIL NOW</h3>
          <br />
          <p className="media-text">
            Productivity loss is a real drag.
            <br /> Especially when you must dedicate your most precious resource, time.
            <br /> With so many outside distractions, do not let Slack become one of
            them. <br /> Introducing{" "}
            <i>
              <strong>Focus Timer</strong>
            </i>, the application that boosts productivity by creating a
            distraction-free Slack Workspace.
          </p>
        </div>
        </div>
        <div className="mid-content">
          <div>
            <h3 className="mid-header">HOW IT WORKS</h3>
          </div>
          <p className="content-text">
            Setting up{" "}
            <i>
              <strong>Focus Timer</strong>
            </i>{" "}
            is easy. 
            <br /> Once logged in, you will be prompted to connect to your existing
            Slack workspace. 
            <br /> You can now use our Slack slash commands to start "focus
            mode."Just type in "/focus." 
            <br /> Focus Premium users benefit from custom time intervals to meet their
            specific needs. 
            <br /> To make things even better, NO MORE MESSAGES! 
            <br /> Users who attempt to contact you will be greeted with a courtesy
            message to try again later. 
            <br /> Simple and effective!{" "}
          </p>
        </div>
        <div className="comparison">
          <Card className="free" style={{ width: "20rem " }}>
            <Card.Body>
              <Card.Title>
                <b>Focus Lite</b>
              </Card.Title>
              <Card.Subtitle className="subtitle">
                Functionality & Performance
              </Card.Subtitle>
              <Card.Text>
                <i>Focus Timer Lite</i> is geared for those users who do not
                need all the bells and whistles. Users can effortlessly
                integrate our app into a Slack workspace and sets themselves in
                "Focus Mode."
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Easy Slack Integration</ListGroup.Item>
                <ListGroup.Item>
                  Focus Mode preset for work/study
                </ListGroup.Item>
                <ListGroup.Item>Long and Short break presets</ListGroup.Item>
              </ListGroup>
              <Card.Footer className="free-footer">
                <em>FREE To Use</em>
              </Card.Footer>
            </Card.Body>
          </Card>
          <Card className="premium" style={{ width: "20rem " }}>
            <Card.Body>
              <Card.Title>
                <b>Focus Premium</b>
              </Card.Title>
              <Card.Subtitle className="subtitle">
                Performance + Customization
              </Card.Subtitle>
              <Card.Text>
                <i>Focus Timer Premium</i> is geared for those users that want
                their timer to be unique as they are. Users can effortlessly
                integrate our app into a Slack workspace and sets themselves in
                "Focus Mode."
              </Card.Text>
              <p>The features of Focus Lite PLUS:</p>
              <ListGroup variant="flush">
                <ListGroup.Item>Customizable themes</ListGroup.Item>
                <ListGroup.Item>Customizable timer intervals</ListGroup.Item>
                <ListGroup.Item>ALL future feature releases</ListGroup.Item>
                <ListGroup.Item>
                  A BIG thank you & virtual Hi-Five! GO YOU!
                </ListGroup.Item>
                <Card.Footer className="premium-footer">
                  <em>Affordable Annual Subscription</em>
                  <br />
                  <Card.Text>$12.99/yr</Card.Text>
                </Card.Footer>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        <div className="bottom">
          <h3 className="bottom-header">ARE YOU READY?</h3>
          <p>
            Try out{" "}
            <i>
              <strong>Focus Timer</strong>
            </i>{" "}
            for yourself today and see how much more productive life can be.
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
