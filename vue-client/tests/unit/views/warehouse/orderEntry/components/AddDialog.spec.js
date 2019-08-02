import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import AddDialog from '@/views/warehouse/orderEntry/components/AddDialog';
import store from '@/store';
import i18n from '@/lang';
import alphanumericValidation from '@/directives/alphanumericValidation';
import numericValidation from '@/directives/numericValidation';
import circularTabNavigationDialog from '@/directives/circularTabNavigationDialog';
import PermissionsPlugin from '@/plugins/permissions';

describe('@/views/warehouse/orderEntry/AddDialog', () => {
  let localVue;

  const permissions = ['addShipment:dataEntry', 'addShipmentAfterCutOff:dataEntry'];

  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.use(PermissionsPlugin);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
    localVue.directive('circular-tab-navigation-dialog', circularTabNavigationDialog);
  });
  const resetForm = jest.fn();
  const handleFocusFirstElement = jest.fn();
  const handleFocusNextElement = jest.fn();
  const dataElement = {
    $refs:
    {
      form:
      {
        resetFields: resetForm,
        $el: [{ focus: handleFocusFirstElement }, {}, {}, {}, { focus: handleFocusNextElement }]
      },
      'form-product': { clearLocalModel: jest.fn() },
      'form-consignee': { clearLocalModel: jest.fn() }
    }
  };

  it('Renders AddDialog succesfully', () => {
    const element = mount(AddDialog, { store, localVue, i18n });
    expect(element.find('button').exists()).toBe(true);
  });

  it('Calls handleClose AddDialog succesfully', () => {
    const element = mount(AddDialog, { store, localVue, i18n });
    const done = jest.fn();
    element.setData(dataElement);
    element.vm.handleClose(done);
    expect(done).toHaveBeenCalled();
  });

  it(' Calls resetForm AddDialog succesfully', () => {
    const element = mount(AddDialog, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.resetForm();
    expect(resetForm).toHaveBeenCalled();
  });

  it(' Calls handleChangeDate AddDialog focus element with index 4 succesfully', () => {
    const element = mount(AddDialog, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleChangeDate();
    expect(handleFocusNextElement).toHaveBeenCalled();
  });

  it(' Calls handleOpen AddDialog focus element with index 0 succesfully', () => {
    const element = mount(AddDialog, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleOpen();
    element.vm.$nextTick(() => {
      expect(handleFocusFirstElement).toHaveBeenCalled();
    });
  });

  it(' Calls submitForm AddDialog succesfully', async () => {
    /* Normal Flow */
    const orderSaveResponse = { message: 'ok' };
    const orderSave = jest.fn().mockImplementation(() => Promise.resolve(orderSaveResponse));
    const orderSearch = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
    store._actions['orderEntry/save'] = [orderSave];
    store._actions['orderEntry/search'] = [orderSearch];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(AddDialog, { store, localVue, i18n });
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.form.validate = submitFormTrue;
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    const response = await element.vm.getSubmitForm();
    expect(response).toEqual(orderSaveResponse);
    expect(submitFormTrue).toHaveBeenCalled();
    expect(orderSave).toHaveBeenCalled();
    expect(orderSearch).toHaveBeenCalled();
    expect.assertions(4);
  });

  it(' Calls submitForm AddDialog Error Flows', async () => {
    /* Normal Flow error api save */
    const orderSaveResponseError = { response: { data: { message: 'Error' } } };
    const errorInvalid = new Error('Invalid');
    const orderSave = jest.fn().mockImplementation(() => Promise.reject(orderSaveResponseError));
    store._actions['orderEntry/save'] = [orderSave];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(false));
    const element = mount(AddDialog, { store, localVue, i18n });

    /* Validation error Flow fields validation */
    const submitFormFalse = jest.fn().mockImplementation(cb => cb(false));
    dataElement.$refs.form.validate = submitFormFalse;
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    try {
      await element.vm.submitForm();
    } catch (error) {
      expect(errorInvalid).toEqual(error);
    }

    /* Validation error Flow Order Save error. */
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.form.validate = submitFormTrue;
    element.setData(dataElement);
    element.setData({ $confirm: confirm });

    try {
      await element.vm.submitForm();
    } catch (error) {
      expect(submitFormFalse).toHaveBeenCalled();
      expect(orderSave).toHaveBeenCalled();
      expect(error).toEqual(orderSaveResponseError);
    }
    expect.assertions(4);
  });
});
