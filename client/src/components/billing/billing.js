// collect payment info 
// process payment through stripe
// activate subscription


import React from "react";
import StripeCheckout from "react-stripe-checkout";

class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: false };

    this.onToken = this.onToken.bind(this);
  }

  async onToken(token) {
    let response = await fetch(
      "http://localhost:8000/api/stripe/subscription",
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

    if (response.ok)
      this.setState({
        complete: true
      });
      console.log("Purchase Successful");
  }

  render() {
    if (this.state.complete) {
      return (
        <div className="page-container">
          <div className="content-container">
            <div className="purchase-complete">
              <h1>Purchase Complete</h1>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="billingpage-container">
          <div className="billingcontent-container">
            <h1 className="billing-title">Billing</h1>

            <div className="billing-card-container">
              <div className="billing-card-body">
                <h2 className="billing-card-title">Enhanced</h2>
                <h3 className="billing-card-subtitle">$12.99/annual</h3>
                <p className="billing-card-text">
                  Click here for $12 a annual subscription
                </p>
                <ul>
                  <li>response message customization</li>
                  <li>Timer customization</li>
                </ul>
                <StripeCheckout
                  className="stripe-checkout"
                  token={this.onToken}
                  stripeKey="pk_test_1F6lljDsFPzn4nZ1FJWV1D2b00nAva7WFN"
                  description="$12.99/mo"
                  name="FocusTime"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Billing;