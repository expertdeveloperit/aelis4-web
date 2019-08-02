import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchFilters from '@/views/warehouse/orderEntry/SearchFilters';
import store from '@/store';
import i18n from '@/lang';
import alphanumericValidation from '@/directives/alphanumericValidation';

describe('@/views/warehouse/orderEntry/SearchFilters', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });

  it('Renders SearchFilters succesfully', () => {
    const element = mount(SearchFilters, { store, localVue, i18n });
    expect(element.find('.el-collapse-item').exists()).toBe(true);
    expect(element.find('#searchForm-aelTerminal').exists()).toBe(true);
    expect(element.find('#searchForm-ship-date').exists()).toBe(true);
    expect(element.find('#searchForm-status').exists()).toBe(true);
    expect(element.find('#searchForm-order-number').exists()).toBe(true);
    expect(element.find('#searchForm-consignee').exists()).toBe(true);
  });

  it('Calls handleSearch succesfully', () => {
    const orderEntrySearch = jest.fn().mockImplementation(() => Promise.resolve({}));
    store._actions['orderEntry/search'] = [orderEntrySearch];
    const element = mount(SearchFilters, { store, localVue, i18n });
    element.vm.handleSearch();
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('Calls handleChangeDate succesfully', () => {
    const orderEntrySearch = jest.fn().mockImplementation(() => Promise.resolve({}));
    const focusFilterStatus = jest.fn();
    store._actions['orderEntry/search'] = [orderEntrySearch];
    const element = mount(SearchFilters, { store, localVue, i18n });
    element.setData({ $refs: { 'filter-status': { focus: focusFilterStatus } } });
    element.vm.handleChangeDate();
    expect(orderEntrySearch).toHaveBeenCalled();
    expect(focusFilterStatus).toHaveBeenCalled();
  });
});
