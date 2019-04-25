import React, { Component, history } from 'react';
import './App.css';
// import { ThemeProvider } from "styled-components";
// import { Button } from "./components/themes/button.style";
// import { Layout } from "./components/themes/background.style"
// import { withCustomTheme } from "./components/themes/with-custom-theme";
import Billing from './components/account_settings/account_settings.js';

import Authenticate from './components/authentication/authentication.js'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Profile from './components/profile/profile.js';

import { connect } from "react-redux";
import {  getEmail } from './actions/index.js';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import axios from 'axios';

// const theme = {
//   colors: {
//       lightest: "#272D2D",
//       primary: "#DDE0BD",
//       secondary: "#272D2D"
//   }
// };

//  const premiumButton1 = {
//   colors: {
//       lightest: "#000000",
//       primary: "azure",
//       secondary: "#000000"
//   }
// };

// const MyPremiumButton1 = withCustomTheme(Button, premiumButton1);

class App extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      id: localStorage.getItem('id'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      view: localStorage.getItem('view'),
      initial: false,
      modalShow: false,
      validated: false
    }
  }
  componentDidMount() {
    // http://localhost:8000
    // https://focustimer-labs11.herokuapp.com
    axios.get(`https://focustimer-labs11.herokuapp.com/api/users/${this.state.email}`)
      .then(res => {
        // console.log(res);
        this.setState({
          id: localStorage.setItem('id', res.data.id),
          firstName: localStorage.setItem('firstName', res.data.firstname),
          lastName: localStorage.setItem('lastName', res.data.lastname),
          email: localStorage.setItem('email', res.data.email),
          phone: localStorage.setItem('phone', res.data.phone),
          timerName: localStorage.setItem('timerName', res.data.timerName),
          timerStart: localStorage.setItem('timerStart', res.data.timerStart),
          timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd),
          modalShow: false,
          validated: true,
          view: localStorage.setItem('view', 'done'),
          premium: localStorage.setItem('premium', res.data.premiumUser)
        })
        if (res.data.premiumUser === true) {
          this.setState({ 
            complete: localStorage.setItem('complete', true),
            premium: localStorage.getItem('premium')
          })
        }
      })
      .catch(err => {
        console.log('MOUNT err', err)
        if (err) {
          this.setState({ modalShow: true })
        }
      });

    if (localStorage.getItem('premium') === true) {
      this.setState({
          complete: localStorage.setItem('complete', true),
          premium: localStorage.getItem('premium')
        })
      }
  }

  componentDidUpdate() {
    // if (localStorage.getItem('slackint') === true) {
    //   this.setState({
    //     slackInt: localStorage.getItem('slackint')
    //   })
    // }
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = () => {
    // http://localhost:8000
    // https://focustimer-labs11.herokuapp.com
    axios.post('https://focustimer-labs11.herokuapp.com/api/users', {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            id: localStorage.setItem('id', res.data.id),
            firstName: localStorage.setItem('firstName', res.data.firstname),
            lastName: localStorage.setItem('lastName', res.data.lastname),
            email: localStorage.setItem('email', res.data.email),
            phone: localStorage.setItem('phone', res.data.phone),
            timerName: localStorage.setItem('timerName', res.data.timerName),
            timerStart: localStorage.setItem('timerStart', res.data.timerStart),
            timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd)
          })
        } else if (res.status === 201) {
          // console.log(localStorage.getItem('email'));
          axios.get(`https://focustimer-labs11.herokuapp.com/api/users/${localStorage.getItem('email')}`)
            .then(res => {
              this.setState({
                id: localStorage.setItem('id', res.data.id),
                firstName: localStorage.setItem('firstName', res.data.firstname),
                lastName: localStorage.setItem('lastName', res.data.lastname),
                email: localStorage.setItem('email', res.data.email),
                phone: localStorage.setItem('phone', res.data.phone),
                timerName: localStorage.setItem('timerName', res.data.timerName),
                timerStart: localStorage.setItem('timerStart', res.data.timerStart),
                timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd)
              })
            })
            .catch(res => console.log('catch error', res))
        }
        this.setState({ modalShow: false });
      }
        // this.setState({ id: localStorage.setItem('id', res.data.id) })
        // console.log(res.status)
      )
      .catch(err => console.log(err));
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      view: localStorage.setItem('view', 'done'),
      validated: true
    })
  }

  submit = () => {
    this.handleClose();
    this.submitHandler();
  }

  logout = () => {
    window.localStorage.clear();
    window.location.reload();
    history.push('/');
  }

  render() {
    const { validated } = this.state;
    
    return (
      <div>
        <Router>
          <div className="App">
            <div className="nav-bar">
              <NavLink exact to='/' className="links" >
                Timer
            </NavLink>

              <NavLink exact to='/billing' className="links" >
                Account Settings
            </NavLink>
            </div>
            <Route exact path='/' component={Profile} />
            <Route exact path='/billing' render={props => <Billing 
              {...props}
              id={this.state.id}
              logout={this.logout}
            />} />
          </div>
        </Router>
        {!this.state.modalShow ? null : (
          <div className="Modal">
            <div>
              <Button onClick={this.handleShow} className="modal-btn">Click Me to Register</Button>
              <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>Please Confirm Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={this.submitHandler}
                >
                <Form.Row>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleChange}
                    name='firstName'
                    placeholder='firstName'
                    value={this.state.firstName}
                    
                  />
                </Form.Row>
                <Form.Row>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  onChange={this.handleChange}
                  name='lastName'
                  placeholder='lastName'
                  value={this.state.lastName}
                  
                />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleChange}
                    name='email'
                    placeholder='email'
                    value={this.state.email}
                    
                  />
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.submit}>Submit</Button>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
          </div>
        )}
      </div>
    )
  }
}
// export default Authenticate(App);

const mapStateToProps = ({ gettingEmail, users }) => {
  return {
    gettingEmail,
    users
  };
};

export default connect(
  mapStateToProps,
  {
    /* action creators go here */
    getEmail,
  }
)(Authenticate(App));