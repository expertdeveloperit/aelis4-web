import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import extensionDetailsDialog from '../../../../../src/views/warehouse/extensionRequest/extensionDetailsDialog';
import store from '../../../../../src/store';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';
import numericValidation from '../../../../../src/directives/numericValidation';

describe('../../../../../src/views/warehouse/extensionRequest/extensionDetailsDialog', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });
  it('Renders extensionDetailsDialog succesfully', () => {
    const element = mount(extensionDetailsDialog, { store, localVue, i18n });
    expect(element.find('button').exists()).toBe(true);
  });
  it('Calls handleClose AddDialog succesfully', () => {
    const element = mount(extensionDetailsDialog, { store, localVue, i18n });
    const done = jest.fn();
    element.setData(element);
    element.vm.handleClose(done);
    expect(done).toHaveBeenCalled();
  });
  it('', () => {

  });
});
