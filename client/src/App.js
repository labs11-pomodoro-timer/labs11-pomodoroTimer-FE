import React, { Component, history } from 'react';
import './App.css';
// import { Auth0Lock } from "auth0-lock";
import Billing from './components/account_settings/account_settings.js';

import Authenticate from './components/authentication/authentication.js'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Profile from './components/profile/profile.js';

import { connect } from "react-redux";
import { addUser, getEmail } from './actions/index.js';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import axios from 'axios';

const profile = localStorage.getItem('profile');

class App extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      phone: localStorage.getItem('phone'),
      timerName: localStorage.getItem('timerName'),
      timerStart: localStorage.getItem('timerStart'),
      timerEnd: localStorage.getItem('timerEnd'),
      view: '',
      initial: false,
      modalShow: true,
      validated: false
    }
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
    
    // let firstName = this.state.firstName;
    // let lastName = this.state.lastName;
    // let email = this.state.email;
    // let combine = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email
    // }
    axios.post('https://focustimer-labs11.herokuapp.com/api/users', { 
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
     })
      .then(res => {
        this.setState({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          timerName: res.data.timerName,
          timerStart: res.data.timerStart,
          timerEnd: res.data.timerEnd,
          view: 'done',
          validated: true
        })
      })
      .catch(err => console.log(err));
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
    // const createInput = text => (
    //   <input
    //     type='text'
    //     onChange={this.handleChange}
    //     name={text}
    //     placeholder={text}
    //     value={this.state[text]}
    //   />
    // );

    const { validated } = this.state;
    
    return (
      <div>
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
            <Route exact path='/billing' component={Billing} />
          </div>
        </Router>
        <div className="Modal">
          <Button onClick={this.handleShow}>Click Me to Register</Button>
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