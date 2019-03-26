import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_DOMAIN_URL,
        clientID: process.env.REACT_APP_CLIENT_ID,
    })
}