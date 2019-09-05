import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import uploadXml from './modules/warehouse/uploadXml';
import orderEntry from './modules/warehouse/orderEntry';
import extensions from './modules/warehouse/extensions';
import account from './modules/warehouse/account';
import getters from './getters';
import extensionRequest from './modules/warehouse/extensionRequest';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    uploadXml,
    orderEntry,
    extensions,
    account,
    extensionRequest
  },
  getters
});

export default store;
