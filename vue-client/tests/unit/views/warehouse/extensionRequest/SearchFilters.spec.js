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
    expect(element.find('#searchForm-shipper-list').exists()).toBe(true);
    expect(element.find('#searchForm-ael-Terminal').exists()).toBe(true);
    expect(element.find('#searchForm-ship-date').exists()).toBe(true);
    expect(element.find('#searchForm-status').exists()).toBe(true);
    expect(element.find('#searchForm-order-number').exists()).toBe(true);
  });
});