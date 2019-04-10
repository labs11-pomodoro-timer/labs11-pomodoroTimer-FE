import React, { Component } from 'react';
import axios from 'axios';

class PremiumView extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            premium: false
        }
    }

    // componentDidMount = () => {
    //     this.changepremium(this.state.id);
    // }

    // changepremium = (id) => {
    //     axios.post('http://localhost:8000/api/stripe/customer/premium', { id })
    //     .then(premiumCus => {
    //         if(premiumCus.data.stripeId) {
    //             this.setState({
    //                 id: premiumCus.data.stripeId
    //             })
    //         }
            
    //         if(premiumCus.data.premium) {
    //             this.setState({
    //                 id,
    //                 premium: premiumCus.data.customer.active
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         this.setState({
    //             premium: false
    //         })
    //     })
    // }

    render() {
        return(
            <h5>
                <span className="badge badge-light">Status:</span>
                <span>
                  {this.state.premium ? (
                    <h3 className="badge badge-info">Premium</h3>
                  ) : (
                    <h3 className="badge badge-secondary">Standard</h3>
                )}
                </span>
            </h5>
        )
    }
}

export default PremiumView;