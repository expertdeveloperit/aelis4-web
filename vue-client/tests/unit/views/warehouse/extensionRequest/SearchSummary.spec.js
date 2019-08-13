import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import SearchSummary from '../../../../../src/views/warehouse/extensionRequest/SearchSummary';
import store from '../../../../../src/store';
import numericValidation from '../../../../../src/directives/numericValidation';
import PermissionsPlugin from '../../../../../src/plugins/permissions';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';

describe('../../../../../src/views/warehouse/extensionRequest/SearchSummary', () => {
  let localVue;
  const responseList = [{
    id: 128991,
    consigneeName: 'Consignee Test',
    status: 1,
    orderNumber: 'AELXML00000680',
  }];
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI, { locale });
    localVue.use(VueMoment);
    localVue.use(PermissionsPlugin);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });
  it('Renders TableSummary succesfully', () => {
    store.commit({ responseList });
    const element = mount(SearchSummary, {
      store, localVue, i18n, sync: false
    });
    expect(element.find('#extension-data-list').exists()).toBe(true);
  });
});
