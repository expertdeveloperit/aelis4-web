import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import UnitsDetailDialog from '@/views/warehouse/orderEntry/components/unitsDetail/UnitsDetailDialog';
import store from '@/store';
import i18n from '@/lang';
import PermissionsPlugin from '@/plugins/permissions';
import constants from '@/utils/constants';

describe('@/views/warehouse/orderEntry/UnitsDetailDialog', () => {
  let localVue;
  const unitId = 673656;
  const unitId2 = 673657;
  const shipDateDelete = '11/02/2019';
  const deleteUnitAction = 'orderEntry/deleteUnit';
  const findUnitsAction = 'orderEntry/findUnits';
  const setUnitsDetailsMutation = 'orderEntry/SET_UNIT_DETAILS';
  const headerUnitConsolidate = {
    id: 272,
    orderId: 1307,
    orderNumber: 'AELXML00027921',
    shipDate: '2019-04-08',
    shipperAccountId: 1,
    consigneeAccountId: 8732,
    consigneeAccount: 'F000690',
    consigneeName: 'CONSIGNEE FOR TESTING',
    length: 40.0,
    width: 50.0,
    height: 60.0,
    measure: 'Inch',
    unitOfMeasureId: 1,
    unitOfMeasureName: 'Box',
    productCode: 'DEFA',
    productDescription: 'COLUMBIA/ECUADOR/PERU FLOWERS',
    status: 1,
    numberUnits: 100,
    poNumber: '',
    farmName: '',
    finalized: true
  };

  const permissions = [
    'deleteBeforeCutOffPending:dataEntry',
    'deleteBeforeCutOffFinalized:dataEntry',
    'deleteAfterCutOffPending:dataEntry',
    'deleteAfterCutOffFinalized:dataEntry'];

  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(PermissionsPlugin);
    localVue.use(ElementUI);
  });

  it('Renders UnitsDetailDialog succesfully', () => {
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    expect(element.find('.el-icon-search').exists()).toBe(true);
  });

  it('Calls handleOpenDialog dialogVisible true', () => {
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    element.vm.handleOpenDialog(1);
    expect(element.vm.dialogVisible).toBe(true);
  });

  it(' Calls findUnitsByConsignee succesfully', () => {
    const orderEntryFindUnits = jest.fn().mockImplementation(() => Promise.reject({ response: { data: [] } }));
    store._actions[findUnitsAction] = [orderEntryFindUnits];
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    element.vm.findUnitsByConsignee(1);
    expect(orderEntryFindUnits).toHaveBeenCalled();
  });

  it(' Calls handleSearchChangeLimit Units succesfully', () => {
    const changeLimitTo = 50;
    const orderEntryFindUnits = jest.fn().mockImplementation(() => Promise.reject({ response: { data: [] } }));
    store._actions[findUnitsAction] = [orderEntryFindUnits];
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    element.vm.handleSearchChangeLimit(changeLimitTo);
    expect(orderEntryFindUnits).toHaveBeenCalledWith({ rows: changeLimitTo, page: constants.TABLES.DEFAULT_PAGE });
  });

  it(' Calls handleClose', () => {
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    const done = jest.fn();
    element.vm.handleClose(done);
    expect(done).toHaveBeenCalled();
  });

  it(' Calls handleDelete', async () => {
    store.commit(setUnitsDetailsMutation, { data: { searchResponse: { data: [{ unitId }] }, unitsConsolidate: headerUnitConsolidate }, filters: {} });
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    const findUnits = jest.fn();
    const unitDelete = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve());
    const success = jest.fn();
    store._actions[findUnitsAction] = [findUnits];
    store._actions[deleteUnitAction] = [unitDelete];
    element.setData({ $confirm: confirm });
    element.setData({ $message: { success } });

    await element.vm.handleDelete(unitId, shipDateDelete);
    expect(success).toHaveBeenCalled();
    expect(unitDelete).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('showDeleteButton unit successfully', async () => {
    store.commit(setUnitsDetailsMutation, { data: { searchResponse: { data: [{ unitId }] }, unitsConsolidate: headerUnitConsolidate }, filters: {} });
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    const showDeleteButton = element.vm.showDeleteButton();
    expect(showDeleteButton).toBe(true);
  });

  it(' Calls handleDelete with data length > 1', async () => {
    store.commit(setUnitsDetailsMutation, { data: { searchResponse: { data: [{ unitId }, { unitId: unitId2 }] }, unitsConsolidate: headerUnitConsolidate }, filters: {} });
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    const findUnits = jest.fn();
    const unitDelete = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve());
    const success = jest.fn();
    store._actions[findUnitsAction] = [findUnits];
    store._actions[deleteUnitAction] = [unitDelete];
    element.setData({ $confirm: confirm });
    element.setData({ $message: { success } });

    await element.vm.handleDelete(unitId, shipDateDelete);
    expect(success).toHaveBeenCalled();
    expect(unitDelete).toHaveBeenCalled();
    expect(findUnits).toHaveBeenCalled();
    expect.assertions(3);
  });

  it(' Calls handleDelete with data length > 1 reject', async () => {
    store.commit(setUnitsDetailsMutation, { data: { searchResponse: { data: [{ unitId }, { unitId: unitId2 }] }, unitsConsolidate: headerUnitConsolidate }, filters: {} });
    const element = mount(UnitsDetailDialog, { store, localVue, i18n });
    const findUnits = jest.fn();
    const unitDelete = jest.fn().mockImplementation(() => Promise.reject({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve());
    const success = jest.fn();
    store._actions[findUnitsAction] = [findUnits];
    store._actions[deleteUnitAction] = [unitDelete];
    element.setData({ $confirm: confirm });
    element.setData({ $message: { success } });

    await element.vm.handleDelete(unitId, shipDateDelete).catch(() => {});
    expect(unitDelete).toHaveBeenCalled();
    expect.assertions(1);
  });
});
