import { Loading, Message } from 'element-ui';
import authConfig from '@/utils/auth/auth_config';
import requestConfigService from '@/api/requestConfigService';
import accountApiService from '@/api/accountService';
import constants from '@/utils/constants';

const user = {
  state: {
    name: '',
    email: '',
    avatar: '',
    roles: [],
    permissions: [],
    /* The groups are shippers Number/Code Associated. */
    groups: [],
    isGoogleAppsUser: false,
    shipperAccountNumber: null,
    shipperAccountLabel: '',
    successfullyCreatedUser: false
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups;
    },
    SET_IS_GOOGLE_APPS_USER: (state, isGoogleAppsUser) => {
      state.isGoogleAppsUser = isGoogleAppsUser;
    },
    SET_SHIPPER_ACCOUNT: (state, { number, name }) => {
      state.shipperAccountNumber = number;
      state.shipperAccountLabel = `${name} - ${number}`;
      requestConfigService.setShipperAccountNumberHeaderRequest(state.shipperAccountNumber);
    },
    SET_SHIPPER_USER_SUCCESSFULLY_SIGN_UP: (state, successfullyCreatedUser) => {
      state.successfullyCreatedUser = successfullyCreatedUser;
    }
  },

  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('SET_NAME', userInfo.name);
      commit('SET_EMAIL', userInfo.email);
      commit('SET_AVATAR', userInfo.picture);
      commit('SET_PERMISSIONS', userInfo[authConfig.permissionsNamespace]);
      commit('SET_ROLES', userInfo[authConfig.rolesNamespace]);
      commit('SET_GROUPS', userInfo[authConfig.groupsNamespace]);
      commit('SET_IS_GOOGLE_APPS_USER', userInfo.sub.includes(authConfig.googleAppsConnection));
    },
    setUserShipperAccount({ commit }, shipperAccount) {
      commit('SET_SHIPPER_ACCOUNT', shipperAccount);
    },
    signUp({ commit }, signUpInformation) {
      return new Promise((resolve, reject) => {
        Message.closeAll();
        const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
        accountApiService.signUpShipperUser(signUpInformation).then((response) => {
          const { data } = response;
          commit('SET_SHIPPER_USER_SUCCESSFULLY_SIGN_UP', true);
          loading.close();
          resolve(data);
        }).catch((error) => {
          commit('SET_SHIPPER_USER_SUCCESSFULLY_SIGN_UP', false);
          loading.close();
          reject(error);
        });
      });
    }
  }
};

export default user;
