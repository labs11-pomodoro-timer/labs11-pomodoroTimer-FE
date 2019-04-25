import React from "react";
import StripeCheckout from "react-stripe-checkout";

import './account_settings.css';

// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// allow user to change email and password
// collect payment info 
// process payment through stripe
// activate subscription

class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: localStorage.getItem('complete'), premium: localStorage.getItem('premium'), changeEmail: '' };
    this.onToken = this.onToken.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('premium') === true) {
      this.setState({
        complete: localStorage.setItem('complete', true),
        premium: localStorage.getItem('premium')
      })
    } 
    axios.get(`https://focustimer-labs11.herokuapp.com/api/users/${localStorage.getItem('email')}`)
      .then(res => {
        this.setState({
          premium: localStorage.setItem('premium', res.data.premiumUser)
        })
        if (res.data.premiumUser === true) {
          this.setState({ 
            complete: localStorage.setItem('complete', true),
            premium: localStorage.getItem('premium')
           })
        }
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    if (localStorage.getItem('premium') === true) {
      this.setState({
        complete: localStorage.setItem('complete', true),
        premium: localStorage.getItem('premium')
      })
    }
  }

  // Local testing URL
  // "http://localhost:8000/api/stripe/subscription"

  async onToken(token) {
    let response = await fetch(
      "https://focustimer-labs11.herokuapp.com/api/stripe/subscription",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripeToken: token.id,
          email: token.email
        })
      }
    );
    console.log(response)
    if (response.ok)
      axios.put(`https://focustimer-labs11.herokuapp.com/api/users/${localStorage.getItem('id')}`, {
        premiumUser: true
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    if (response.ok)
        this.setState({ 
          premium: localStorage.setItem('premium', true),
        })
    
    if (response.ok)
      this.setState({ 
        premium: localStorage.getItem('premium'),
        complete: localStorage.setItem('complete', true) 
      })
    console.log("Purchase Successful");
  }

  handleEmailChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitEmailHandler = () => {
    axios.put(`https://focustimer-labs11.herokuapp.com/api/users/${localStorage.getItem('id')}`, { 
      email: this.state.changeEmail
     })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.setState({
      changeEmail: '',
    })
  }

  render() {
    return (
      <div>
        <div className="change-email">
        <p>Not you? {localStorage.getItem('firstName')}, {localStorage.getItem('email')}</p>
        <Form>
            <Form.Row>
              <Form.Label>Change Email</Form.Label>
              <Form.Control
                type='text'
                onChange={this.handleEmailChange}
                name='changeEmail'
                placeholder='Email'
                value={this.state.changeEmail}
                    
              />
            </Form.Row>
            <button className="form-btn" onClick={this.submitEmailHandler}>Submit</button>
          </Form>
        </div>
        {this.state.premium ? (
          <div>
            <h5>
              <span className="badge badge-light">Status:</span>
              <span>
                {this.state.premium ? (
                  <h3 className="badge badge-dark">Premium</h3>
                ) : (
                    <h3 className="badge badge-secondary">Standard</h3>
                  )}
              </span>
            </h5>
            {/* <Form>
              <Form.Group controlId="formGridState">
                <Form.Label>Theme</Form.Label>
                <Form.Control as="select">
                  <option>Default</option>
                  <option>Premium Theme 1</option>
                </Form.Control>
              </Form.Group>
            </Form> */}
          </div>
        ) : (
            <div>
              <h5>
                <span className="badge badge-light">Status:</span>
                <span>
                  {this.state.premium ? (
                    <h3 className="badge badge-dark">Premium</h3>
                  ) : (
                      <h3 className="badge badge-secondary">Standard</h3>
                    )}
                </span>
                <span className="logoutBtn" onClick={this.props.logout}>Logout</span>
              </h5>
              <div className="billing-container">
                <div className="billingcontent-container">
                  <div className="billing-card-container">
                    <div className="billing-card-body">
                      <h2 className="billing-card-title">Focus Plus</h2>
                      <h3 className="billing-card-subtitle">$12.99/annual</h3>
                      <p className="billing-card-text">
                        Click here for a $12.99 annual subscription
                  </p>
                      <p className="list">Ephemeral messages during Focus Time that YOU choose</p>
                      <p className="list">Customizeable front-end to view Focus Timer in browser</p>
                      <p className="list">Support development!</p>
                      <StripeCheckout
                        className="stripe-checkout"
                        token={this.onToken}
                        stripeKey="pk_test_1F6lljDsFPzn4nZ1FJWV1D2b00nAva7WFN"
                        description="$12.99/yr"
                        name="Focus-Timer"
                        email=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
};

export default Billing;