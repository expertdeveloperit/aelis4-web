import auth0 from 'auth0-js';
import { EventEmitter } from 'events';
import authConfig from './auth_config';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID || 'test',
  responseType: 'token id_token',
  scope: 'openid profile upload:dataEntry',
  audience: process.env.VUE_APP_AUDIENCE || 'test',
  leeway: 60
});

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
  idToken = null;

  accessToken = null;

  profile = null;

  tokenExpiry = null;

  accessTokenExpiry = null;

  defaultState = '/';

  errorMessage = '';

  login(customState) {
    webAuth.authorize({
      appState: customState || this.defaultState,
      errorMessage: this.errorMessage
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.accessToken = null;
    this.tokenExpiry = null;
    this.profile = null;
    this.accessTokenExpiry = null;

    webAuth.logout({
      returnTo: `${window.location.origin}`
    });

    setTimeout(() => {
      this.emit(loginEvent, { loggedIn: false });
    }, 500);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          this.errorMessage = err.errorDescription;
          this.login(err.state);
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  isAuthenticated() {
    return (
      Date.now() < this.tokenExpiry
      && localStorage.getItem(localStorageKey) === 'true'
    );
  }

  isIdTokenValid() {
    return (
      this.idToken
      && this.tokenExpiry
      && Date.now() < this.tokenExpiry
    );
  }

  isAccessTokenValid() {
    return (
      this.accessToken
      && this.accessTokenExpiry
      && Date.now() < this.accessTokenExpiry
    );
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        this.renewTokens().then((authResult) => {
          resolve(authResult.idToken);
        }, reject(new Error('Unable to renew authentication')));
      } else {
        resolve('Not Authenticated');
      }
    });
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        this.renewTokens().then((authResult) => {
          resolve(authResult.accessToken);
        }, reject);
      }
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;

    this.accessToken = authResult.accessToken;

    // Convert the expiry time from seconds to milliseconds,
    // required by the Date constructor
    this.tokenExpiry = new Date(this.profile.exp * 1000);

    // Convert expiresIn to milliseconds and add the current time
    // (expiresIn is a relative timestamp, we want an absolute time)
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        reject(new Error('Not logged in'));
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }
}

const auth0Service = new AuthService();
auth0Service.setMaxListeners(5);

export default auth0Service;
