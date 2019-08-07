import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import uploadXml from './modules/warehouse/uploadXml';
import orderEntry from './modules/warehouse/orderEntry';
import extensionRequest from './modules/warehouse/extensionRequest';
import account from './modules/warehouse/account';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    uploadXml,
    orderEntry,
    account,
    extensionRequest,
  },
  getters
});

export default store;
