import { EventEmitter } from 'events';
import { WebAuth } from 'auth0-js';
import auth0Service from '@/utils/auth/auth0Service';

describe('@/utils/auth/auth0Service', () => {
  const expTime = new Date();
  expTime.setDate(expTime.getDate() + 1);

  const emitEvent = jest.fn();
  const authResult = {
    accessToken: '4hb7fPnVUIRfBXDFJq0UKdZJgNl0cgPl',
    idToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI-XDLv-akvcwPfCcLoOn0H7zJgEpMxMrP4hliFEpWHstzvd8pFX-A',
    idTokenPayload: {
      t_hash: 'aleWiH7vdaws9rwTR0C0rQ',
      aud: 'q2mFo4IkthhO3qfwGVtQ2K0OpdwNCXiu',
      email: 'drendon@kometsales.com',
      email_verified: true,
      exp: expTime.getTime(),
      iat: 1552335071,
      iss: 'https://armellini.auth0.com/',
      name: 'drendon@kometsales.com',
      nickname: 'drendon',
      nonce: 'UoHKS5gLrLdG0g6GsEnMXU8xE7XO5A6P',
      picture: 'https://s.gravatar.com/avatar/d3a5da950bcee4157f93be2823d2671c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdr.png',
      sub: 'auth0|5c82ca3d3491ca7fd19d9052',
      pdated_at: '2019-03-11T15:22:12.192Z'
    },
    expiresIn: 7200
  };
  const notAuthenticated = 'Not Authenticated';

  beforeEach(() => {
    EventEmitter.prototype.emit = emitEvent;
  });

  it('Should call WebAuth.authorize method when Auth0Service.login its called', () => {
    const authorize = jest.fn();
    WebAuth.prototype.authorize = authorize;
    auth0Service.login();
    expect(authorize).toHaveBeenCalled();
    expect.assertions(1);
  });

  it('Should call WebAuth.logout method when Auth0Service.logOut its called', () => {
    const logout = jest.fn();
    WebAuth.prototype.logout = logout;
    auth0Service.logOut();
    expect(logout).toHaveBeenCalled();
    expect.assertions(1);
  });

  it('Should fill the local attributes with authResult when Auth0Service.localLogin its called', () => {
    auth0Service.localLogin(authResult);
    expect(emitEvent).toHaveBeenCalled();
    expect(auth0Service.idToken).toEqual(authResult.idToken);
    expect(auth0Service.profile).toEqual(authResult.idTokenPayload);
    expect(auth0Service.accessToken).toEqual(authResult.accessToken);
    expect.assertions(4);
  });

  it('Should return the token by Auth0Service.getAccessToken method', async () => {
    const checkSession = jest.fn().mockImplementation(() => Promise.resolve(authResult));
    WebAuth.prototype.checkSession = checkSession;
    const accessToken = await auth0Service.getAccessToken();
    expect(accessToken).toEqual(authResult.accessToken);
    expect.assertions(1);
  });

  it('Should renew token by Auth0Service.getAccessToken method if its invalid', async () => {
    const checkSession = jest.fn((message, cb) => cb(null, authResult));
    WebAuth.prototype.checkSession = checkSession;
    auth0Service.accessTokenExpiry = null;
    const accessToken = await auth0Service.getAccessToken();
    expect(checkSession).toHaveBeenCalled();
    expect(emitEvent).toHaveBeenCalled();
    expect(accessToken).toEqual(authResult.accessToken);
    expect.assertions(3);
  });


  it('Should return idToken when Auth0Service.getIdToken method its called', async () => {
    let idToken = await auth0Service.getIdToken();
    expect(idToken).toEqual(authResult.idToken);

    const checkSession = jest.fn((message, cb) => cb(null, authResult));
    WebAuth.prototype.checkSession = checkSession;
    auth0Service.tokenExpiry = null;
    idToken = await auth0Service.getIdToken();
    expect(idToken).toEqual(notAuthenticated);
    expect.assertions(2);
  });

  it('Should calls WebAuth.checkSession when Auth0Service.renewTokens its called', async () => {
    const err = new Error();
    let checkSession = jest.fn((message, cb) => cb(err, authResult));
    WebAuth.prototype.checkSession = checkSession;
    try {
      await auth0Service.renewTokens();
    } catch (responseError) {
      expect(responseError).toEqual(err);
    }

    checkSession = jest.fn((message, cb) => cb(null, authResult));
    WebAuth.prototype.checkSession = checkSession;
    const response = await auth0Service.renewTokens();
    expect(checkSession).toHaveBeenCalled();
    expect(emitEvent).toHaveBeenCalled();
    expect(response.accessToken).toEqual(authResult.accessToken);
  });

  it('Should calls WebAuth.parseHash when Auth0Service.handleAuthentication method its called', async () => {
    const parseHash = jest.fn(cb => cb(null, authResult));
    WebAuth.prototype.parseHash = parseHash;
    await auth0Service.handleAuthentication();
    expect(parseHash).toHaveBeenCalled();
  });

  it('Should calls WebAuth.parseHash when Auth0Service.handleAuthentication method its called with error', async () => {
    const err = new Error();
    const parseHash = jest.fn(cb => cb(err, null));
    WebAuth.prototype.parseHash = parseHash;
    try {
      await auth0Service.handleAuthentication();
    } catch (error) {
      expect(err).toEqual(error);
    }
  });
});
