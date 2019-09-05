import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import AddDialog from '../../../../../../src/views/warehouse/orderEntry/components/AddDialog';
import store from '../../../../../../src/store';
import i18n from '../../../../../../src/lang';
import alphanumericValidation from '../../../../../../src/directives/alphanumericValidation';
import numericValidation from '../../../../../../src/directives/numericValidation';
import PermissionsPlugin from '../../../../../../src/plugins/permissions';

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
      'form-consignee': { clearLocalModel: jest.fn() },
      'form-farm-name': { clearLocalModel: jest.fn() }
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

  it(' Calls getSubmitForm   AddDialog succesfully', async () => {
    /* Given the following configurations */
    const settings = {
      shipDateFutureDays: 10, warehouseCode: 'MIA', shipperAccountId: 1, cutoffHourForToday: '22:00:00', minCubesPerBox: 100
    };
    store.commit('orderEntry/SET_SETTINGS', settings);
    const orderSaveResponse = { message: 'ok' };
    const orderSave = jest.fn().mockImplementation(() => Promise.resolve(orderSaveResponse));
    const orderSearch = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
    store._actions['orderEntry/save'] = [orderSave];
    store._actions['orderEntry/search'] = [orderSearch];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(AddDialog, { store, localVue, i18n });
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.form.validate = submitFormTrue;

    // Test Min Value Confirm
    let dataElementCopy = Object.assign({}, dataElement);
    dataElementCopy.form = {};
    dataElementCopy.form.length = 1;
    dataElementCopy.form.width = 1;
    dataElementCopy.form.height = 1;
    element.setData(dataElementCopy);
    element.setData({ $confirm: confirm });
    let response = await element.vm.submitForm();
    expect(response).toEqual(orderSaveResponse);
    expect(submitFormTrue).toHaveBeenCalled();
    expect(orderSave).toHaveBeenCalled();
    expect(orderSearch).toHaveBeenCalled();

    // Test confirm min value false
    const confirmFalse = jest.fn().mockImplementation(() => Promise.resolve(false));
    element.setData({ $confirm: confirmFalse });
    response = await element.vm.submitForm();
    expect(response).toEqual(false);

    // Test Normal Value
    dataElementCopy = Object.assign({}, dataElement);
    dataElementCopy.form = {};
    dataElementCopy.form.length = 10;
    dataElementCopy.form.width = 10;
    dataElementCopy.form.height = 10;
    element.setData(dataElementCopy);
    element.setData({ $confirm: confirm });
    response = await element.vm.submitForm();
    expect(response).toEqual(orderSaveResponse);
    expect(submitFormTrue).toHaveBeenCalled();
    expect(orderSave).toHaveBeenCalled();
    expect(orderSearch).toHaveBeenCalled();
    expect.assertions(9);
  });

  it(' Calls getSubmitForm AddDialog Error Flows', async () => {
    /* Normal Flow error api save */
    const orderSaveResponseError = { response: { data: { message: 'Error' } } };
    const errorInvalid = new Error('Invalid');
    const orderSave = jest.fn().mockImplementation(() => Promise.reject(orderSaveResponseError));
    store._actions['orderEntry/save'] = [orderSave];
    const element = mount(AddDialog, { store, localVue, i18n });

    /* Validation error Flow fields validation */
    const submitFormFalse = jest.fn().mockImplementation(cb => cb(false));
    dataElement.$refs.form.validate = submitFormFalse;
    element.setData(dataElement);
    try {
      await element.vm.getSubmitForm();
    } catch (error) {
      expect(errorInvalid).toEqual(error);
    }

    /* Validation error Flow Order Save error. */
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.form.validate = submitFormTrue;
    element.setData(dataElement);

    try {
      await element.vm.getSubmitForm();
    } catch (error) {
      expect(submitFormFalse).toHaveBeenCalled();
      expect(orderSave).toHaveBeenCalled();
      expect(error).toEqual(orderSaveResponseError);
    }
    expect.assertions(4);
  });
});
