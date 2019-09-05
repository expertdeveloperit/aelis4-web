import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchFilters from '../../../../../src/views/warehouse/extensionRequest/SearchFilters';
import store from '../../../../../src/store';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';

describe('../../../../../src/views/warehouse/extensionRequest/SearchFilters', () => {
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
    expect(element.find('#searchForm-shipper').exists()).toBe(true);
    expect(element.find('#searchForm-aelTerminal').exists()).toBe(true);
    expect(element.find('#searchForm-ship-date').exists()).toBe(true);
    expect(element.find('#searchForm-status').exists()).toBe(true);
    expect(element.find('#searchForm-order-number').exists()).toBe(true);
  });

  it('Calls handleSearch succesfully', () => {
    const extensionRequestSearch = jest.fn().mockImplementation(() => Promise.resolve({}));
    store._actions['extensionRequest/search'] = [extensionRequestSearch];
    const element = mount(SearchFilters, { store, localVue, i18n });
    element.vm.handleSearch();
    expect(extensionRequestSearch).toHaveBeenCalled();
  });

  it('Calls handleChangeDate succesfully', () => {
    const extensionRequestSearch = jest.fn().mockImplementation(() => Promise.resolve({}));
    const focusFilterStatus = jest.fn();
    store._actions['extensionRequest/search'] = [extensionRequestSearch];
    const element = mount(SearchFilters, { store, localVue, i18n });
    element.setData({ $refs: { 'filter-status': { focus: focusFilterStatus } } });
    element.vm.handleChangeDate();
    expect(extensionRequestSearch).toHaveBeenCalled();
    expect(focusFilterStatus).toHaveBeenCalled();
  });
});
