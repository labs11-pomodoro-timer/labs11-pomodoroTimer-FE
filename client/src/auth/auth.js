// import auth0 from 'auth0-js';
// import history from '../history';

// // This file may not be required to use if Auth0Lock takes care of this. Leaving code here in case we need it.

// export default class Auth {
//     accessToken;
//     idToken;
//     expiresAt;

//     auth0 = new auth0.WebAuth({
//         domain: process.env.REACT_APP_DOMAIN_URL,
//         clientID: process.env.REACT_APP_CLIEND_ID,
//         redirectUri: process.env.CALLBACK_URL,
//         responseType: 'token id_token',
//         scope: 'openid'
//     });

//     constructor() {
//     this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//     this.getAccessToken = this.getAccessToken.bind(this);
//     this.getIdToken = this.getIdToken.bind(this);
//     this.renewSession = this.renewSession.bind(this);
//     }

//     login() {
//         this.auth0.authorize();
//     }

//     handleAuthentication() {
//         this.auth0.parseHash((err, authResult) => {
//             if (authResult && authResult.accessToken && authResult.idToken) {
//                 this.setSession(authResult);
//             } else if (err) {
//                 history.replace('/');
//                 console.log(err);
//                 alert(`Error: ${err.error}. Check the console for details.`);
//             }
//         });
//     }

//     getAccessToken() {
//         return this.accessToken;
//     }

//     getIdToken() {
//         return this.idToken;
//     }

//     setSession(authResult) {
//         // set isLoggedIn flag in localStorage
//         localStorage.setItem('isLoggedIn', 'true');

//         // set the time that the access token will expire at
//     }
// }