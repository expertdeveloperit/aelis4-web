import { Loading, Message } from 'element-ui';
import moment from 'moment';
import constants from '@/utils/constants';
import orderApiService from '@/api/orderService';

const searchSection = ['search-section'];

const orderEntry = {
  namespaced: true,
  state: {
    settings: {
      shipperAccountId: null
    },
    orderAddSuccess: false,
    orderUpdateSuccess: false,
    isEditingRow: false,
    filtersOpen: searchSection,
    filterShipDateDisabled: false,
    isCreatingExtension: false,
    shipDatePickerOptions: {
      disabledDate(time) {
        return moment(time.getTime()).isBefore(Date.now(), 'day');
      }
    },
    actualFilters: {
      shipDate: null,
      status: null,
      createdByUsername: null,
      orderNumber: null,
      consigneeAccountId: null,
      page: constants.TABLES.DEFAULT_PAGE,
      rows: constants.TABLES.DEFAULT_LIMIT,
      shipperAccountId: null,
      pageResults: true,
      orderField: null,
      orderDirection: null
    },
    loadingSearch: false,
    cutoff: {
      isClosed: false,
      limitDateMillis: 0,
      limitDateMillisNewShipDate: 0
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
    SAVE: (state, orderAddSuccess) => {
      state.orderAddSuccess = orderAddSuccess;
    },
    SET_UPDATE: (state, orderUpdateSuccess) => {
      state.orderUpdateSuccess = orderUpdateSuccess;
    },
    SET_EDIT: (state, isEditingRow) => {
      state.isEditingRow = isEditingRow;
    },
    SET_ORDERS: (state, { ordersList, total, filters }) => {
      if (ordersList) {
        ordersList.map((order) => {
          order.edit = false;
          return order;
        });
      }
      state.list = ordersList || [];
      state.total = total;
      state.actualFilters = filters || {};
    },
    SET_SUMMARY_FILTERS: (state, filters) => {
      state.actualFilters = filters;
    },
    SET_LOADING: (state, loadingSearch) => {
      state.loadingSearch = loadingSearch;
    },
    SET_CUTOFF_CLOSED: (state, isCLosed) => {
      state.cutoff.isClosed = isCLosed;
    },
    SET_CUTOFF_LIMIT_DATE: (state, { cutoffDateTime, currentDateTime }) => {
      if (cutoffDateTime) {
        const cutoffLimitDateMillis = moment(cutoffDateTime).valueOf() - moment(currentDateTime).valueOf();
        state.cutoff.limitDateMillis = cutoffLimitDateMillis > 0 ? cutoffLimitDateMillis : 0;
        state.cutoff.isClosed = state.cutoff.limitDateMillis === 0 || false;
      } else {
        state.cutoff.limitDateMillis = 0;
        state.cutoff.isClosed = true;
      }
    },
    SET_CUTOFF_LIMIT_DATE_NEW_SHIP_DATE: (state, { cutoffDateTime, currentDateTime }) => {
      if (cutoffDateTime) {
        const cutoffLimitDateMillis = moment(cutoffDateTime).valueOf() - moment(currentDateTime).valueOf();
        state.cutoff.limitDateMillisNewShipDate = cutoffLimitDateMillis > 0 ? cutoffLimitDateMillis : 0;
      } else {
        state.cutoff.limitDateMillisNewShipDate = 0;
      }
    },
    SET_SETTINGS: (state, settings) => {
      state.settings = settings;
      state.actualFilters.shipperAccountId = settings.shipperAccountId;
      state.shipDatePickerOptions = {
        disabledDate(time) {
          return moment(time.getTime()).isBefore(Date.now(), 'day')
          || moment(time.getTime()).isAfter(moment().add(settings[constants.SETTINGS.shipDateFutureDays] || 0, 'days'), 'day');
        }
      };
    },
    SET_UNIT_DETAILS: (state, { data, filters }) => {
      state.actualFiltersUnits = filters;
      state.headerUnitList = data.unitsConsolidate;
      state.searchUnitResponse = data.searchResponse;
    },
    SET_FILTER_SHIP_DATE_DISABLED: (state, filterShipDateDisabled) => {
      state.filterShipDateDisabled = filterShipDateDisabled;
    },
    SET_IS_CREATING_EXTENSION: (state, isCreatingExtension) => {
      state.isCreatingExtension = isCreatingExtension;
    }
  },
  actions: {
    save({ commit, state }, orderToSave) {
      commit('SET_EDIT', false);
      return new Promise((resolve, reject) => {
        const orderToSaveSend = Object.assign({}, orderToSave);
        orderToSaveSend.shipDate = moment(orderToSave.shipDate.getTime()).format(constants.DATES.DEFAULT_DISPLAY_FORMAT_SHORT);
        orderToSaveSend.shipperAccountId = state.settings.shipperAccountId;
        orderApiService.save(orderToSaveSend).then((response) => {
          commit('SAVE', true);
          resolve(response);
        }).catch((error) => {
          commit('SAVE', false);
          reject(error);
        });
      });
    },
    setEditingRow({ commit }, isEditingRow) {
      commit('SET_EDIT', isEditingRow);
    },
    update({ commit }, { unitsConsolidateId, orderToUpdate }) {
      return new Promise((resolve, reject) => {
        orderApiService.update(unitsConsolidateId, orderToUpdate).then((response) => {
          commit('SET_UPDATE', true);
          resolve(response);
        }).catch((error) => {
          commit('SET_UPDATE', false);
          reject(error);
        });
      });
    },
    setSummaryFilters({ commit, state }, filters) {
      const filtersUpdated = Object.assign(state.actualFilters, filters);
      commit('SET_SUMMARY_FILTERS', filtersUpdated);
    },
    search({ commit, state }, filters) {
      commit('SET_LOADING', true);
      commit('SET_EDIT', false);
      const filtersUpdated = Object.assign(state.actualFilters, filters);
      return new Promise((resolve, reject) => {
        filtersUpdated.orderNumber = filtersUpdated.orderNumber ? filtersUpdated.orderNumber.trim() : null;
        filtersUpdated.shipDate = filtersUpdated.shipDate || new Date();
        orderApiService.search(filtersUpdated).then((response) => {
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
    finalize({ commit, state }) {
      commit('SET_EDIT', false);
      Message.closeAll();
      return new Promise((resolve, reject) => {
        orderApiService.finalizeShipments(state.actualFilters).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    changeShipDate({ commit, state }, newShipDate) {
      commit('SET_EDIT', false);
      return new Promise((resolve, reject) => {
        const newShipDateToSend = moment(newShipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
        orderApiService.changeShipDate(state.actualFilters, newShipDateToSend).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    delete({ commit }, id) {
      commit('SET_EDIT', false);
      return orderApiService.deleteShipments(id);
    },
    setCutoffClosed({ commit }, isCLosed) {
      commit('SET_CUTOFF_CLOSED', isCLosed);
    },
    getCutoffLimitDate({ commit, state }) {
      return new Promise((resolve, reject) => {
        const shipDate = state.actualFilters.shipDate instanceof Date ? moment(state.actualFilters.shipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT) : state.actualFilters.shipDate;
        orderApiService.getCutoffLimitDate(state.actualFilters.shipperAccountId, shipDate).then((response) => {
          const { data } = response;
          commit('SET_CUTOFF_LIMIT_DATE', data);
          resolve(response);
        }).catch((error) => {
          commit('SET_CUTOFF_LIMIT_DATE', {});
          reject(error);
        });
      });
    },
    getCutoffLimitDateNewShipdate({ commit, state }, newShipDate) {
      return new Promise((resolve, reject) => {
        const newShipDateToSend = moment(newShipDate).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
        orderApiService.getCutoffLimitDate(state.actualFilters.shipperAccountId, newShipDateToSend).then((response) => {
          const { data } = response;
          commit('SET_CUTOFF_LIMIT_DATE_NEW_SHIP_DATE', data);
          resolve(response);
        }).catch((error) => {
          commit('SET_CUTOFF_LIMIT_DATE_NEW_SHIP_DATE', {});
          reject(error);
        });
      });
    },
    getSettings({ rootGetters, commit }) {
      return new Promise((resolve, reject) => {
        orderApiService.getSettings(rootGetters.user.shipperAccountNumber).then((response) => {
          const { data } = response;
          commit('SET_SETTINGS', data);
          resolve(data);
        }).catch((error) => {
          commit('SET_SETTINGS', {});
          reject(error);
        });
      });
    },
    findUnits({ commit, state }, filters) {
      commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        const filtersToSend = Object.assign(state.actualFiltersUnits, filters);
        orderApiService.findUnits(filtersToSend).then((response) => {
          const { data } = response;
          console.log('Units Data:', response.data);
          console.log('units response', response.data);
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
    deleteUnit(store, id) {
      return orderApiService.deleteUnit(id);
    },
    async printUnit(store, unitId) {
      const loading = Loading.service(constants.LOADING.PRINT_CONFIG);
      const response = await orderApiService.printUnit(unitId);
      loading.close();
      return response;
    },
    async printUnitsConsolidate(store, unitsConsolidateId) {
      const loading = Loading.service(constants.LOADING.PRINT_CONFIG);
      const response = await orderApiService.printUnitsConsolidate(unitsConsolidateId);
      loading.close();
      return response;
    },
    async printLabelsMassive({ commit, state }) {
      commit('SET_EDIT', false);
      Message.closeAll();
      const loading = Loading.service(constants.LOADING.PRINT_CONFIG);
      const response = await orderApiService.printLabelsMassive(state.actualFilters);
      loading.close();
      return response;
    },
    async printShippingManifest({ commit, state }) {
      commit('SET_EDIT', false);
      Message.closeAll();
      const loading = Loading.service(constants.LOADING.SHIPPING_MANIFEST_CONFIG);
      const response = await orderApiService.printShippingManifest(state.actualFilters);
      loading.close();
      return response;
    },
    setFilterShipDateDisabled({ commit }, filterShipDateDisabled) {
      commit('SET_FILTER_SHIP_DATE_DISABLED', filterShipDateDisabled);
    },
    setIsCreatingExtension({ commit }, isCreatingExtension) {
      commit('SET_IS_CREATING_EXTENSION', isCreatingExtension);
    }
  }
};

export default orderEntry;
