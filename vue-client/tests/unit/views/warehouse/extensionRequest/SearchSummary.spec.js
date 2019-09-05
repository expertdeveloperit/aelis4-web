import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import SearchSummary from '../../../../../src/views/warehouse/extensionRequest/SearchSummary';
import store from '../../../../../src/store';
import numericValidation from '../../../../../src/directives/numericValidation';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';
import constants from '../../../../../src/utils/constants';

describe('../../../../../src/views/warehouse/extensionRequest/SearchSummary', () => {
  let localVue;
  const responseList = [{
    number: 'EX14',
    shipperAccountName: 'Aelis4',
    shipperAccountId: '1',
    shipperAccountNumber: 'SP001',
    shippingHour: '17:15:00',
    numberUnits: 1,
    contactNumber: 343453453453453,
    shipDate: '2019-08-30',
    status: 0
  }];
  const extensionRequestSearchAction = 'extensionRequest/search';
  const SET_ORDERS_MUTATION = 'extensionRequest/SET_ORDERS';
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI, { locale });
    localVue.use(VueMoment);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });

  it('Renders Summary succesfully', () => {
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList });
    const element = mount(SearchSummary, {
      store, localVue, i18n, sync: false
    });
    expect(element.find('#extension-data-list').exists()).toBe(true);
  });

  it('Calls handleSearchChangePage succesfully', () => {
    const extensionRequestSearch = jest.fn();
    store._actions[extensionRequestSearchAction] = [extensionRequestSearch];
    const element = shallowMount(SearchSummary, {
      store, localVue, i18n, sync: false
    });
    element.vm.handleSearchChangePage();
    expect(extensionRequestSearch).toHaveBeenCalled();
  });

  it('Calls handleSearchChangeLimit succesfully', () => {
    const extensionRequestSearch = jest.fn();
    store._actions[extensionRequestSearchAction] = [extensionRequestSearch];
    const element = mount(SearchSummary, { store, localVue, i18n });
    element.vm.handleSearchChangeLimit();
    expect(extensionRequestSearch).toHaveBeenCalled();
  });

  it('SearchSummary Calls handleSortChange succesfully', () => {
    const extensionRequestSearch = jest.fn();
    store._actions[extensionRequestSearchAction] = [extensionRequestSearch];
    const element = mount(SearchSummary, { store, localVue, i18n });
    element.vm.handleSortChange({ prop: 'extensionHash', order: 'descending' });
    expect(extensionRequestSearch).toHaveBeenCalled();
  });
  it('SearchSummary showSearchButton successfully', () => {
    const orderStatus = constants.ORDER_ENTRY.ORDER_STATUS[0].value;
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList, total: 1 });
    const element = mount(SearchSummary, { store, localVue, i18n });
    const showSearchButton = element.vm.handleSearch(orderStatus);
    expect(showSearchButton).toBe(true);
  });
});
