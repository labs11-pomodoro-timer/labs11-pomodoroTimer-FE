import React from "react";
import StripeCheckout from "react-stripe-checkout";

// allow user to change email and password
// collect payment info 
// process payment through stripe
// activate subscription

class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: false };
    this.onToken = this.onToken.bind(this);
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
      this.setState({
        complete: true
      });
    console.log("Purchase Successful");
  }

  render() {
    return (
      <div>
        {this.state.complete ? (
          <h5>
            <span className="badge badge-light">Status:</span>
            <span>
              {this.state.complete ? (
                <h3 className="badge badge-info">Premium</h3>
              ) : (
                  <h3 className="badge badge-secondary">Standard</h3>
                )}
            </span>
          </h5>
        ) : (
            <div>
              <h5>
                <span className="badge badge-light">Status:</span>
                <span>
                  {this.state.complete ? (
                    <h3 className="badge badge-info">Premium</h3>
                  ) : (
                      <h3 className="badge badge-secondary">Standard</h3>
                    )}
                </span>
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