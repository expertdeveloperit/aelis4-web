import accountApiService from '../../../api/accountService';
import constants from '../../../utils/constants';

const getDefaultStateShippers = () => ({
  filters: {
    page: constants.TABLES.DEFAULT_PAGE,
    rows: constants.TABLES.DEFAULT_LIMIT_MINI,
    search: null,
    pageResults: true
  },
  loading: false,
  list: [],
  totalRows: 0,
  multipleShippers: false
});

const account = {
  namespaced: true,
  state: {
    shippers: getDefaultStateShippers()
  },
  mutations: {
    SET_SHIPPERS_SCROLL: (state, data) => {
      state.shippers.list = state.shippers.list.concat(data.shippers.data);
      state.shippers.totalRows = data.shippers.totalRows;
      // This flag allows identify that the user has multiple shippers, regardless of whether because of the filters it only shows 1 or less later
      if (state.shippers.totalRows > 1) {
        state.shippers.multipleShippers = true;
      }
      state.shippers.filters.page = data.filters.page + 1;
    },
    SET_LOADING: (state, loading) => {
      state.shippers.loading = loading;
    },
    RESET_SHIPPERS_STATE: (state) => {
      // we save this value of the user because is the only that not must be reset.
      const { multipleShippers } = state.shippers;
      Object.assign(state.shippers, getDefaultStateShippers());
      state.shippers.multipleShippers = multipleShippers;
    }
  },
  actions: {
    addConsigneeShipperRelation(store, { shipperAccountId, consigneeAccountId }) {
      return new Promise((resolve, reject) => {
        accountApiService.addConsigneeShipperRelation(shipperAccountId, consigneeAccountId).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async getShipperListScroll({ commit, state }, search) {
      commit('SET_LOADING', true);
      const filtersUpdated = Object.assign(state.shippers.filters, { search });
      const response = await accountApiService.getShippers(filtersUpdated);
      commit('SET_SHIPPERS_SCROLL', { shippers: response, filters: filtersUpdated });
      commit('SET_LOADING', false);
      return response;
    },
    resetShipperList({ commit }) {
      commit('RESET_SHIPPERS_STATE');
    }
  }
};

export default account;
