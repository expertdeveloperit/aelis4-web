import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import ExtensionDetailsDialog from '../../../../../src/views/warehouse/extensionRequest/extensionDetailsDialog';
import store from '../../../../../src/store';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';
import numericValidation from '../../../../../src/directives/numericValidation';
import circularTabNavigationDialog from '../../../../../src/directives/circularTabNavigationDialog';
// import PermissionsPlugin from '../../../../../src/plugins/permissions';

describe('../../../../../src/views/warehouse/extensionRequest/extensionDetailsDialog', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
    localVue.directive('circular-tab-navigation-dialog', circularTabNavigationDialog);
  });
  it('Renders ExtensionDetailsDialog succesfully', () => {
    const element = mount(ExtensionDetailsDialog, { store, localVue, i18n });
    expect(element.find('button').exists()).toBe(true);
  });
});
