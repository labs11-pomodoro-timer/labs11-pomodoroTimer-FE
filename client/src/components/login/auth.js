import auth0 from "auth0-js";
import history from "../history";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: "focus-timer.auth0.com",
    clientID: "f4fmRQmmf6YrrsMPmWDyVD3SAWB9258r",
    redirectUri: "https://focus-timer.now.sh",
    // redirectUri: "http://localhost:3000/",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }


  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log("auth result", authResult);
        console.log("profile", authResult.idTokenPayload);
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;

        // assign gathered values to localStorage for persistence in the application
        localStorage.setItem("jwt", authResult.idToken);
        localStorage.setItem("email", authResult.idTokenPayload.email);
        localStorage.setItem("name", authResult.idTokenPayload.name);
        localStorage.setItem("img_url", authResult.idTokenPayload.picture);
        localStorage.setItem("isLoggedIn", true);
        history.replace("/authorization");

        resolve();
      });
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }


  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile, "Get Profile");
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("jwt");
    localStorage.removeItem("img_url");
    localStorage.removeItem("lsid");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    // navigate to the home route
    // history.replace("/home");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}