import Vuex from 'vuex';
import Router from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ShipperList from '@/components/ShipperList';
import i18n from '@/lang';
import store from '@/store';
import AuthPlugin from '@/plugins/auth';
import numericValidation from '@/directives/numericValidation';
import alphanumericValidation from '@/directives/alphanumericValidation';

describe('@/components/ShipperList', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(AuthPlugin);
    localVue.use(Vuex);
    localVue.use(Router);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });

  // Actions
  const shipperSearchAction = 'account/getShipperListScroll';
  const shipperResetSearchAction = 'account/resetShipperList';
  const setShipperAction = 'setUserShipperAccount';
  const getOrderEntrySettingsAction = 'orderEntry/getSettings';
  const getOrderEntrySearchAction = 'orderEntry/search';
  const getOrderEntryCutoffLimitDateAction = 'orderEntry/getCutoffLimitDate';

  const responseShippers = {
    totalRows: 938,
    data: [{ id: 6319, name: 'ALLSTAR ORCHIDS & FLOWERS', number: 'M023050' },
      { id: 7217, name: 'ALLURE FARMS INC.', number: 'M200459' },
      { id: 4823, name: 'ALPHA FERN    ', number: 'E009140' },
      { id: 6776, name: 'ALPINE FRESH INC', number: 'M400077' },
      { id: 5812, name: 'ALPINE FRESH INC - BILL TO', number: 'M010050' },
      { id: 4062, name: 'AMC FLORAL INTERNATIONAL', number: 'M002882' },
      { id: 7616, name: 'AMERICAN BUSINESS LOGISTICS', number: 'M000605' },
      { id: 7466, name: 'AMERICAN FLORAL CARGO CORP', number: 'M000810' },
      { id: 6860, name: 'AMERICAN LOGISTICS & CONSOL (ACL)', number: 'M400047' }]
  };

  it('Renders ShipperList succesfully', () => {
    const element = mount(ShipperList, { localVue, i18n, store });
    expect(element.find('.shipper-container').exists()).toBe(true);
  });

  it('Calls search ShipperList succesfully one shipper initial and openList', () => {
    store.commit('account/SET_SHIPPERS_SCROLL', { shippers: { totalRows: responseShippers.totalRows, data: [responseShippers.data[0]] }, filters: { page: 1 } });
    const shipperSearch = jest.fn().mockImplementation(() => Promise.resolve(responseShippers));
    const shipperSearchReset = jest.fn();
    const searchText = 'AMER';
    store._actions[shipperSearchAction] = [shipperSearch];
    store._actions[shipperResetSearchAction] = [shipperSearchReset];
    const actionStrSelectChained = [getOrderEntrySettingsAction, getOrderEntrySearchAction, getOrderEntryCutoffLimitDateAction];
    const element = mount(ShipperList, {
      propsData: {
        actionStrSelectChained
      },
      localVue,
      i18n,
      store
    });
    element.setData({ searchText });
    element.vm.search();
    expect(shipperSearch).toHaveBeenCalledWith(searchText);
    expect(shipperSearchReset).toHaveBeenCalled();
    element.vm.openList();
    expect(element.vm.show).toEqual(true);
    expect.assertions(3);
  });

  it('Calls change ShipperList succesfully', () => {
    store.commit('account/SET_SHIPPERS_SCROLL', { shippers: responseShippers, filters: { page: 1 } });
    const setShipper = jest.fn();
    const getOrderEntrySettings = jest.fn();
    store._actions[setShipperAction] = [setShipper];
    store._actions[getOrderEntrySettingsAction] = [getOrderEntrySettings];
    const actionStrSelectChained = [getOrderEntrySettingsAction];
    const element = mount(ShipperList, {
      propsData: {
        actionStrSelectChained
      },
      localVue,
      i18n,
      store
    });
    element.vm.change(responseShippers.data[0]);
    expect(setShipper).toHaveBeenCalledWith(responseShippers.data[0]);
    expect(getOrderEntrySettings).toHaveBeenCalled();
    expect.assertions(2);
  });
});
