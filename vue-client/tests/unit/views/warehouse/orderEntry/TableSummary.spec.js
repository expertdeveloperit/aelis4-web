import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import TableSummary from '../../../../../src/views/warehouse/orderEntry/TableSummary';
import store from '../../../../../src/store';
import numericValidation from '../../../../../src/directives/numericValidation';
import PermissionsPlugin from '../../../../../src/plugins/permissions';
import i18n from '../../../../../src/lang';
import alphanumericValidation from '../../../../../src/directives/alphanumericValidation';
import constants from '../../../../../src/utils/constants';

describe('../../../../../src/views/warehouse/orderEntry/TableSummary', () => {
  let localVue;
  const responseList = [{
    id: 128991,
    consigneeId: 122,
    consigneeName: 'Consignee Test',
    consigneeAccount: 'CONTEST',
    farmName: null,
    height: 10,
    length: 10,
    measure: 'Inch',
    numberUnits: 12,
    orderNumber: 'AELXML00000680',
    poNumber: null,
    productCode: 'ROSP',
    productDescription: 'ROSA SPP. ROSE PINCH & GO',
    status: 1,
    unitOfMeasureName: 'Box',
    width: 10,
    edit: false
  }];

  const permissions = ['editBeforeCutOffPending:dataEntry',
    'editBeforeCutOffFinalized:dataEntry',
    'editAfterCutOffPending:dataEntry',
    'editAfterCutOffFinalized:dataEntry',
    'deleteBeforeCutOffPending:dataEntry',
    'deleteBeforeCutOffFinalized:dataEntry',
    'deleteAfterCutOffPending:dataEntry',
    'deleteAfterCutOffFinalized:dataEntry'];

  const orderEntrySearchAction = 'orderEntry/search';

  const resetForm = jest.fn();
  const dataElement = {
    $refs: {
      editForm: { resetFields: resetForm },
      'row-consignee': { clearLocalModel: jest.fn(), setLocalModel: jest.fn() },
      'row-productCode': { clearLocalModel: jest.fn(), setLocalModel: jest.fn() },
      'row-farm-broker': { clearLocalModel: jest.fn(), setLocalModel: jest.fn() }
    }
  };
  const SET_ORDERS_MUTATION = 'orderEntry/SET_ORDERS';
  // });

  // describe('../../../../../src/views/warehouse/orderEntry/TableSummary', () => {
  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI, { locale });
    localVue.use(VueMoment);
    localVue.use(PermissionsPlugin);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });

  it('Renders TableSummary succesfully', () => {
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList });
    const element = mount(TableSummary, {
      store, localVue, i18n, sync: false
    });
    expect(element.find('#order-data-list').exists()).toBe(true);
  });

  it('Calls handleSearchChangePage succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = shallowMount(TableSummary, {
      store, localVue, i18n, sync: false
    });
    element.vm.handleSearchChangePage();
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('Calls handleSearchChangeLimit succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = mount(TableSummary, { store, localVue, i18n });
    element.vm.handleSearchChangeLimit();
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('TableSummary Calls handleSortChange succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = mount(TableSummary, { store, localVue, i18n });
    element.vm.handleSortChange({ prop: 'orderNumber', order: 'descending' });
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('TableSummary showEditButton successfully', () => {
    const orderStatus = constants.ORDER_ENTRY.ORDER_STATUS[1].value;
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList, total: 1 });
    const element = mount(TableSummary, { store, localVue, i18n });
    const showEditButton = element.vm.showEditButton(orderStatus);
    expect(showEditButton).toBe(true);
  });

  it('TableSummary showDeleteButton successfully', () => {
    const orderStatus = constants.ORDER_ENTRY.ORDER_STATUS[2].value;
    store.commit('orderEntry/SET_CUTOFF_CLOSED', true);
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList, total: 1 });
    const element = mount(TableSummary, { store, localVue, i18n });
    const showDeleteButton = element.vm.showDeleteButton(orderStatus);
    expect(showDeleteButton).toBe(true);
  });

  it('TableSummary Calls handleEdit succesfully', () => {
    const orderEntrySearch = jest.fn();
    const row = responseList[0];
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = mount(TableSummary, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleEdit(row);

    expect(element.vm.editForm.id).toEqual(row.id);
    expect(element.vm.editForm.shipDate).toEqual(row.shipDate);
    expect(element.vm.editForm.consigneeAccountId).toEqual(row.consigneeAccountId);
    expect(element.vm.editForm.unitOfMeasureName).toEqual(row.unitOfMeasureName);
    expect(element.vm.editForm.measure).toEqual(row.measure);
    expect(element.vm.editForm.length).toEqual(row.length);
    expect(element.vm.editForm.width).toEqual(row.width);
    expect(element.vm.editForm.height).toEqual(row.height);
    expect(element.vm.editForm.productCode).toEqual(row.productCode);
    expect(element.vm.editForm.productDescription).toEqual(row.productDescription);
    expect(element.vm.editForm.poNumber).toEqual(row.poNumber);
    expect(element.vm.editForm.farmName).toEqual(row.farmName);
    element.vm.cancelEdit(row);
    expect(resetForm).toHaveBeenCalled();
    expect.assertions(13);
  });

  it('TableSummary Calls handleUpdate succesfully', async () => {
    /* Given the following configurations */
    const settings = {
      shipDateFutureDays: 10, warehouseCode: 'MIA', shipperAccountId: 1, cutoffHourForToday: '22:00:00', minCubesPerBox: 100
    };
    store.commit('orderEntry/SET_SETTINGS', settings);
    const orderEntrySearch = jest.fn();
    const orderEntryUpdate = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const success = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    store._actions['orderEntry/update'] = [orderEntryUpdate];
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(TableSummary, { store, localVue, i18n });
    dataElement.$refs.editForm.validate = submitFormTrue;
    dataElement.$message = { success };

    // Test Min Value Confirm
    let dataElementCopy = Object.assign({}, dataElement);
    dataElementCopy.editForm = {};
    dataElementCopy.editForm.length = 1;
    dataElementCopy.editForm.width = 1;
    dataElementCopy.editForm.height = 1;
    dataElementCopy.editForm.measure = constants.ORDER_ENTRY.MEASURE_LIST[1].value;
    element.setData(dataElementCopy);
    element.setData({ $confirm: confirm });
    await element.vm.handleUpdate();
    expect(orderEntryUpdate).toHaveBeenCalled();

    // Test confirm min value false
    const confirmFalse = jest.fn().mockImplementation(() => Promise.resolve(false));
    element.setData({ $confirm: confirmFalse });
    const response = await element.vm.handleUpdate();
    expect(response).toEqual(false);

    // Test Normal Value
    dataElementCopy = Object.assign({}, dataElement);
    dataElementCopy.editForm = {};
    dataElementCopy.editForm.length = 10;
    dataElementCopy.editForm.width = 10;
    dataElementCopy.editForm.height = 10;
    dataElementCopy.editForm.measure = constants.ORDER_ENTRY.MEASURE_LIST[1].value;
    element.setData(dataElementCopy);
    element.setData({ $confirm: confirm });
    await element.vm.handleUpdate();
    expect(orderEntryUpdate).toHaveBeenCalled();
    expect.assertions(3);
  });

  it('TableSummary Calls handleUpdate error validation form', () => {
    const validationsErrors = {
      height: [{ message: 'The height is required', field: 'height' }],
      width: [{ message: 'The Width is required', field: 'width' }]
    };

    const orderEntryUpdate = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const warning = jest.fn();
    store._actions['orderEntry/update'] = [orderEntryUpdate];
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(false, validationsErrors));
    const element = mount(TableSummary, { store, localVue, i18n });
    element.setData({ $message: { warning } });
    dataElement.$refs.editForm.validate = submitFormTrue;
    dataElement.$message = { warning };
    element.setData(dataElement);
    element.vm.getSubmitForm();
    expect(warning).toHaveBeenCalled();
  });
});
describe('@/views/warehouse/orderEntry/TableSummary Delete actions', () => {
  let localVue;
  const permissions = ['editBeforeCutOffPending:dataEntry',
    'editBeforeCutOffFinalized:dataEntry',
    'editAfterCutOffPending:dataEntry',
    'editAfterCutOffFinalized:dataEntry',
    'deleteBeforeCutOffPending:dataEntry',
    'deleteBeforeCutOffFinalized:dataEntry',
    'deleteAfterCutOffPending:dataEntry',
    'deleteAfterCutOffFinalized:dataEntry'];
  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI, { locale });
    localVue.use(VueMoment);
    localVue.use(PermissionsPlugin);
    localVue.directive('numeric-validation', numericValidation);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
  });
  const orderEntrySearchAction = 'orderEntry/search';

  it('TableSummary Calls handleDelete succesfully', () => {
    const orderEntrySearch = jest.fn();
    const orderEntryDelete = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve());
    const success = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    store._actions['orderEntry/delete'] = [orderEntryDelete];
    const element = mount(TableSummary, { store, localVue, i18n });
    element.setData({ $confirm: confirm });
    element.setData({ $message: { success } });

    return element.vm.handleDelete().then(() => {
      expect(success).toHaveBeenCalled();
      expect(orderEntryDelete).toHaveBeenCalled();
      expect(orderEntrySearch).toHaveBeenCalled();
      expect.assertions(3);
    });
  });

  it('TableSummary Calls handleDelete error flow', () => {
    const orderEntryDelete = jest.fn().mockImplementation(() => Promise.reject({ response: { data: { message: 'ok' } } }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve());
    const message = jest.fn();
    store._actions['orderEntry/delete'] = [orderEntryDelete];
    const element = mount(TableSummary, { store, localVue, i18n });
    element.setData({ $confirm: confirm });
    element.setData({ $message: message });

    return element.vm.handleDelete().then(() => {
      expect(orderEntryDelete).toHaveBeenCalled();
    });
  });
});
