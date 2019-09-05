import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import VueMoment from 'vue-moment';
import alphanumericValidation from '@/directives/alphanumericValidation';
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
    localVue.use(VueMoment);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
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


  it(' Calls findUnitsByConsignee in extension mode succesfully', async () => {
    // Given This configuration  IS_CREATING_EXTENSION true:
    store.commit('orderEntry/SET_IS_CREATING_EXTENSION', true);
    const response = {
      data: {
        unitsConsolidate: {
          id: 118,
          orderId: 230,
          orderNumber: 'AELXML00001427',
          shipDate: '2019-07-23',
          shipperAccountId: 1,
          shipperAccountNumber: 'M200044',
          consigneeAccountId: 2,
          consigneeAccount: 'ACTEST02',
          consigneeName: 'Consignee Test',
          length: 12.0,
          width: 12.0,
          height: 12.0,
          measure: 'Inch',
          unitOfMeasureId: 2,
          unitOfMeasureName: 'Box',
          productCode: 'DEFA',
          productDescription: 'COLUMBIA/ECUADOR/PERU FLOWERS',
          status: 1,
          numberUnits: 12,
          poNumber: '',
          farmName: '',
          labelPrinted: false,
          auditCreationDate: '2019-07-18T12:05:49',
          auditLastUpdate: '2019-07-23T08:37:59',
          createdByUsername: 'aelis4@kometsales.com',
          lastUpdatedByUsername: 'aelis4@kometsales.com',
          finalized: true
        },
        searchResponse: {
          totalRows: 2,
          data: [
            {
              id: 1862, orderId: 230, orderNumber: 'AELXML00001427', unitId: 'AELI001256', labelPrinted: false, unitsConsolidateId: 118
            },
            {
              id: 1863, orderId: 230, orderNumber: 'AELXML00001427', unitId: 'AELI001257', labelPrinted: false, unitsConsolidateId: 118
            }]
        },
        unitIds: [1862, 1863]
      }
    };
    const consigneeAccountId = 2;
    const consigneeAccountName = 'ACTEST02';
    const consolidateSelected = {
      consigneeAccountId, consigneeAccountName, consolidateId: 218, consolidateTotal: 2
    };
    const page = 1;
    const orderEntryFindUnits = jest.fn().mockImplementation(() => Promise.resolve(response));
    const updateUnitsAfterLoadDetail = jest.fn();
    store._actions[findUnitsAction] = [orderEntryFindUnits];
    store._actions['extensions/updateUnitsAfterLoadDetail'] = [updateUnitsAfterLoadDetail];
    const element = mount(UnitsDetailDialog, {
      store, localVue, i18n, propsData: { unitsConsolidateId: consolidateSelected.consolidateId, consigneeAccountId }
    });

    // When we select all consolidation, when we search by first time the action updateSelectedConsolidate must be called to fill units.
    // Select consolidate to extend.
    await store.dispatch('extensions/updateSelectedConsolidate', consolidateSelected);
    // Search details.
    element.vm.findUnitsByConsignee(page);

    // Then the action to search must be called with:
    await expect(orderEntryFindUnits).toHaveBeenCalledWith({
      unitsConsolidateId: consolidateSelected.consolidateId, unitId: '', page, returnAllUnitIds: true
    });
    await expect(updateUnitsAfterLoadDetail).toHaveBeenCalledWith({
      consolidateId: consolidateSelected.consolidateId, consigneeAccountId, unitIds: response.data.unitIds
    });
  });


  it('UnitsDetailDialog Calls isCheckedExtension succesfully', () => {
    // Given This configuration  IS_CREATING_EXTENSION true:
    store.commit('orderEntry/SET_IS_CREATING_EXTENSION', true);
    const consigneeAccountId = 221;
    const unitsConsolidateId = 1888727829;
    const unitIdLocal = 4001;
    const selectedByConsignee = {
      221: {
        consigneeAccountName: 'ARMELLINI PALM CITY DOCK - M200044',
        totalUnits: 2,
        consolidations: [
          {
            id: unitsConsolidateId, total: 2, totalChecked: 2, units: [unitIdLocal], allDetailsCheckedInitially: true
          }
        ]
      }
    };
    store.commit('extensions/UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    const element = mount(UnitsDetailDialog, {
      store, localVue, i18n, propsData: { unitsConsolidateId, consigneeAccountId }
    });
    const isCheckedExtensionUnitd = element.vm.isCheckedExtension(unitIdLocal);
    expect(isCheckedExtensionUnitd).toBe(true);
    const isNotCheckedExtensionUnitd = element.vm.isCheckedExtension(3099);
    expect(isNotCheckedExtensionUnitd).toBe(false);
  });

  it('UnitsDetailDialog Calls handleUpdateSelectedUnitConsolidate succesfully', () => {
    // Given This configuration:
    const unitConsolidateSendToActionSelected = {
      consigneeAccountId: headerUnitConsolidate.consigneeAccountId, consigneeAccountName: headerUnitConsolidate.consigneeName, consolidateId: headerUnitConsolidate.id, consolidateTotal: headerUnitConsolidate.numberUnits, unitId: 4001
    };
    const updateSelecteUnit = jest.fn();
    store._actions['extensions/updateSelecteUnit'] = [updateSelecteUnit];
    const element = mount(UnitsDetailDialog, {
      store, localVue, i18n, propsData: { unitsConsolidateId: headerUnitConsolidate.id }
    });

    // When we call handleUpdateSelectedUnitConsolidate.
    element.vm.handleUpdateSelectedUnitConsolidate(unitConsolidateSendToActionSelected.unitId);

    // Then the action extensions/updateSelecteUnit have been called with the espected unitConsolidateSendToAction
    expect(updateSelecteUnit).toHaveBeenCalledWith(unitConsolidateSendToActionSelected);
  });
});
