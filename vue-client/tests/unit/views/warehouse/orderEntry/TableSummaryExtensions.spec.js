import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import TableSummaryExtensions from '../../../../../src/views/warehouse/orderEntry/TableSummaryExtensions';
import store from '../../../../../src/store';
import i18n from '../../../../../src/lang';
import constants from '../../../../../src/utils/constants';

describe('../../../../../src/views/warehouse/orderEntry/TableSummaryExtensions', () => {
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

  const orderEntrySearchAction = 'orderEntry/search';

  const SET_ORDERS_MUTATION = 'orderEntry/SET_ORDERS';

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI, { locale });
    localVue.use(VueMoment);
  });

  it('Renders TableSummaryExtensions succesfully', () => {
    store.commit(SET_ORDERS_MUTATION, { ordersList: responseList });
    const element = mount(TableSummaryExtensions, {
      store, localVue, i18n, sync: false
    });
    expect(element.find('#order-data-list').exists()).toBe(true);
  });

  it('Calls TableSummaryExtensions handleSearchChangePage succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = shallowMount(TableSummaryExtensions, {
      store, localVue, i18n, sync: false
    });
    element.vm.handleSearchChangePage();
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('Calls TableSummaryExtensions handleSearchChangeLimit succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    element.vm.handleSearchChangeLimit();
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('TableSummaryExtensions Calls handleSortChange succesfully', () => {
    const orderEntrySearch = jest.fn();
    store._actions[orderEntrySearchAction] = [orderEntrySearch];
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    element.vm.handleSortChange({ prop: 'orderNumber', order: 'descending' });
    expect(orderEntrySearch).toHaveBeenCalled();
  });

  it('TableSummaryExtensions Calls handleUpdateSelectedConsolidate succesfully', () => {
    const consigneeAccountId = 12929929;
    const consigneeName = 'Consignee Test';
    const id = 199999002;
    const numberUnits = 122;
    const consolidateSelected = {
      consigneeAccountId, consigneeName, id, numberUnits, numberUnitsReceived: 0
    };
    const consolidateSendToActionSelected = {
      consigneeAccountId, consigneeAccountName: consigneeName, consolidateId: id, consolidateTotal: numberUnits
    };
    const updateSelectedConsolidate = jest.fn();
    store._actions['extensions/updateSelectedConsolidate'] = [updateSelectedConsolidate];
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    element.vm.handleUpdateSelectedConsolidate(consolidateSelected);
    expect(updateSelectedConsolidate).toHaveBeenCalledWith(consolidateSendToActionSelected);
  });

  it('TableSummaryExtensions Calls cancelExtension succesfully', async () => {
    const clearSelectedByConsignee = jest.fn();
    const setFilterShipDateDisabled = jest.fn();
    const setIsCreatingExtension = jest.fn();
    store._actions['extensions/clearSelectedByConsignee'] = [clearSelectedByConsignee];
    store._actions['orderEntry/setFilterShipDateDisabled'] = [setFilterShipDateDisabled];
    store._actions['orderEntry/setIsCreatingExtension'] = [setIsCreatingExtension];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    element.setData({
      $confirm: confirm
    });
    await element.vm.cancelExtension();
    expect(clearSelectedByConsignee).toHaveBeenCalled();
    expect(setFilterShipDateDisabled).toHaveBeenCalledWith(false);
    expect(setIsCreatingExtension).toHaveBeenCalledWith(false);
  });

  it('TableSummaryExtensions Calls isCheckedExtension succesfully', () => {
    const consigneeAccountId = 221;
    const consolidateIdTest = 1888727829;
    const selectedByConsignee = {
      221: {
        consigneeAccountName: 'ARMELLINI PALM CITY DOCK - M200044',
        totalUnits: 423,
        consolidations: [
          {
            id: 1888727829, total: 10, totalChecked: 10, units: [], allDetailsCheckedInitially: true
          },
          {
            id: 1888727830, total: 413, totalChecked: 413, units: [], allDetailsCheckedInitially: true
          },
        ]
      }
    };
    const consigneeIdTestDoesNotExists = 400;
    const consolidateIdTestDoesNotExists = 188872790;
    store.commit('extensions/UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    const isCheckedExtension = element.vm.isCheckedExtension(consigneeAccountId, consolidateIdTest);
    expect(isCheckedExtension).toBe(true);

    // Consignee exists but consolidateId does not.
    expect(element.vm.isCheckedExtension(consigneeAccountId, consolidateIdTestDoesNotExists)).toBe(false);

    // Consignee does not exists and consolidateId either.
    expect(element.vm.isCheckedExtension(consigneeIdTestDoesNotExists, consolidateIdTestDoesNotExists)).toBe(false);

    expect.assertions(3);
  });

  it('TableSummaryExtensions Calls showCheckbox succesfully', () => {
    const statusExtensionPending = 0;
    const statusExtensionApproved = 1;
    const statusExtensionRejected = 2;
    const statusConsolidationPending = constants.ORDER_ENTRY.ORDER_STATUS[1].value;
    const statusConsolidationFinalized = constants.ORDER_ENTRY.ORDER_STATUS[2].value;
    const numberUnits = 70;
    const numberUnitsReceived = 40;

    const element = mount(TableSummaryExtensions, { store, localVue, i18n });

    // 1. Status Pending, and Extension Pending
    const showCheckboxUnitConsolidatePendingPending = element.vm.showCheckbox(statusConsolidationPending, numberUnits, numberUnitsReceived, statusExtensionPending);
    expect(showCheckboxUnitConsolidatePendingPending).toBe(false);

    // 2. Status Pending, and Extension Rejected
    const showCheckboxUnitConsolidatePendingRejected = element.vm.showCheckbox(statusConsolidationPending, numberUnits, numberUnitsReceived, statusExtensionRejected);
    expect(showCheckboxUnitConsolidatePendingRejected).toBe(false);

    // 3. Status Finalized, and Extension rejected
    const showCheckboxUnitConsolidateFinalizedRejected = element.vm.showCheckbox(statusConsolidationFinalized, numberUnits, numberUnitsReceived, statusExtensionRejected);
    expect(showCheckboxUnitConsolidateFinalizedRejected).toBe(true);

    // 4. Status Finalized, and Extension approved
    const showCheckboxUnitConsolidateFinalizedApproved = element.vm.showCheckbox(statusConsolidationFinalized, numberUnits, numberUnitsReceived, statusExtensionApproved);
    expect(showCheckboxUnitConsolidateFinalizedApproved).toBe(false);

    expect.assertions(4);
  });

  it('TableSummaryExtensions Calls isIndeterminate succesfully', () => {
    const consigneeAccountId = 221;
    const consolidateIdTest = 1888727829;
    const selectedByConsignee = {
      221: {
        consigneeAccountName: 'ARMELLINI PALM CITY DOCK - M200044',
        totalUnits: 423,
        consolidations: [
          {
            id: 1888727829, total: 10, totalChecked: 9, units: [], allDetailsCheckedInitially: true
          }
        ]
      }
    };
    const consigneeIdTestDoesNotExists = 400;
    const consolidateIdTestDoesNotExists = 188872790;
    store.commit('extensions/UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    const element = mount(TableSummaryExtensions, { store, localVue, i18n });
    const isIndeterminate = element.vm.isIndeterminate(consigneeAccountId, consolidateIdTest);
    expect(isIndeterminate).toBe(true);

    // Consignee exists but consolidateId does not.
    expect(element.vm.isIndeterminate(consigneeAccountId, consolidateIdTestDoesNotExists)).toBe(false);

    // Consignee does not exists and consolidateId either.
    expect(element.vm.isIndeterminate(consigneeIdTestDoesNotExists, consolidateIdTestDoesNotExists)).toBe(false);

    expect.assertions(3);
  });
});
