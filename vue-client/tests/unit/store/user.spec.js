import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { cloneDeep } from 'lodash';
import user from '@/store/modules/user';
import authConfig from '@/utils/auth/auth_config';
import accountApiService from '@/api/accountService';

describe('@state/modules/app', () => {
  const shipperAccountCode = 'M000299';
  const shipperAccountName = 'ARMELLINI MIA';
  const fullName = 'User Test SignUp';
  const email = 'testsignup@email.com';
  const password = '123456$rE';

  let store;
  let localVue;
  const userInfo = {
    name: 'aelis4TestUser',
    picture: 'https://s.gravatar.com/avatar/d3a5da950bcee4157f93be2823d2671c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdr.png'
  };
  userInfo[authConfig.groupsNamespace] = ['SHIPPER01'];
  userInfo[authConfig.rolesNamespace] = ['Internal'];
  userInfo[authConfig.permissionsNamespace] = ['changeNumberOfUnitsBeforeCuttOfPending:dataEntry', 'editBeforeCutOffPending:dataEntry', 'editBeforeCutOffFinalized:dataEntry', 'editAfterCutOffPending:dataEntry'];

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(user));
  });

  it('exports a valid Vuex module', () => {
    expect(user).toBeAVuexModule();
  });

  describe('user in a store mutations and actions', () => {
    it('actions.setUserInfo calls mutation and sets correct state', () => {
      const shipperAccountNumberLocal = 'SHIPPER01';
      const shipperAccountNameLocal = 'Shipper Tests SHIPPER01';
      store.dispatch('setUserInfo', userInfo);
      store.dispatch('setUserShipperAccount', { number: shipperAccountNumberLocal, name: shipperAccountNameLocal });
      expect(store.state.name).toEqual(userInfo.name);
      expect(store.state.avatar).toEqual(userInfo.picture);
      expect(store.state.roles).toEqual(userInfo[authConfig.rolesNamespace]);
      expect(store.state.permissions).toEqual(userInfo[authConfig.permissionsNamespace]);
      expect(store.state.groups).toEqual(userInfo[authConfig.groupsNamespace]);
      expect(store.state.shipperAccountNumber).toEqual(userInfo[authConfig.groupsNamespace][0]);
      userInfo[authConfig.groupsNamespace] = null;
      store.dispatch('setUserInfo', userInfo);
      expect(store.state.groups).toEqual(userInfo[authConfig.groupsNamespace]);
      expect.assertions(7);
    });

    it('actions.signUp calls api successfully and sets correct state', async () => {
      // Given:
      accountApiService.signUpShipperUser = jest.fn().mockImplementation(() => Promise.resolve({ message: 'Ok' }));
      const form = {
        shipperAccountCode,
        shipperAccountCodeAndName: `${shipperAccountCode} - ${shipperAccountName || ''}`,
        email,
        fullName,
        password,
        passwordCheck: password
      };

      // When:
      await store.dispatch('signUp', form);

      // Then:
      expect(store.state.successfullyCreatedUser).toBe(true);
      expect(accountApiService.signUpShipperUser).toHaveBeenCalledWith(form);
      expect.assertions(2);
    });

    it('actions.signUp calls api with error and sets correct state', async () => {
      // Given:
      const errorResponse = { message: 'A user already exists with this email address' };
      accountApiService.signUpShipperUser = jest.fn().mockImplementation(() => Promise.reject(errorResponse));
      const form = {
        shipperAccountCode,
        shipperAccountCodeAndName: `${shipperAccountCode} - ${shipperAccountName || ''}`,
        email,
        fullName,
        password,
        passwordCheck: password
      };

      // When:
      try {
        await store.dispatch('signUp', form);
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }

      // Then:
      expect(store.state.successfullyCreatedUser).toBe(false);
      expect(accountApiService.signUpShipperUser).toHaveBeenCalledWith(form);
      expect.assertions(3);
    });
  });
});
