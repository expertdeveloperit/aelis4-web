import moment from 'moment';
import constants from '../../../utils/constants';
import extensionService from '../../../api/extensionService';

const searchSection = ['search-section'];

const extensionRequest = {
  namespaced: true,
  state: {
    actualFilters: {
      shipper: '',
      aelTerminal: null,
      receivingdate: null,
      status: null,
      extensionNo: null,
      dropdownData: null
    },
    loadingSearch: false,
    filtersOpen: searchSection,
    shipDatePickerOptions: {
      disabledDate(time) {
        return moment(time.getTime()).isBefore(Date.now(), 'day');
      }
    },
    actualFiltersUnits: {
      rows: constants.TABLES.DEFAULT_LIMIT,
      page: constants.TABLES.DEFAULT_PAGE,
      pageResults: true
    },
    searchUnitResponse: {},
    headerUnitList: {},
    list: [],
    total: 0
  },
  mutations: {
    SET_UNIT_DETAILS: (state, { data, filters }) => {
      state.actualFiltersUnits = filters;
      state.headerUnitList = data.extensions;
      state.searchUnitResponse = data.extensionConsolidate;
    },
    SET_LOADING: (state, loadingSearch) => {
      state.loadingSearch = loadingSearch;
    }
  },
  actions: {
    search({ commit, state }, filters) {
      commit('SET_LOADING', true);
      commit('SET_EDIT', false);
      const filtersUpdated = Object.assign(state.actualFilters, filters);
      return new Promise((resolve, reject) => {
        filtersUpdated.extensionNumber = filtersUpdated.extensionNumber ? filtersUpdated.extensionNumber.trim() : null;
        filtersUpdated.shipDate = filtersUpdated.shipDate || new Date();
        extensionService.search(filtersUpdated).then((response) => {
          const { data, totalRows } = response;
          commit('SET_ORDERS', { ordersList: data, total: totalRows, filters: filtersUpdated });
          commit('SET_LOADING', false);
          resolve(data);
        }).catch((error) => {
          commit('SET_ORDERS', [], 0, filtersUpdated);
          commit('SET_LOADING', false);
          reject(error);
        });
      });
    },
    findUnits({ commit, state }, filters) {
      commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        const filtersToSend = Object.assign(state.actualFiltersUnits, filters);
        extensionService.findUnits(filtersToSend).then((response) => {
          const { data } = response;
          console.log('Response data', response.data);
          commit('SET_UNIT_DETAILS', { data, filters: filtersToSend });
          commit('SET_LOADING', false);
          resolve(response);
        }).catch((error) => {
          commit('SET_UNIT_DETAILS', { data: {}, filters: {} });
          commit('SET_LOADING', false);
          reject(error);
        });
      });
    },
  },
  async getWarehouseCodes() {
    extensionService.getWarehouse().then(response => response.data.data);
  }
};

export default extensionRequest;
