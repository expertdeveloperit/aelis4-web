import Vuex from 'vuex';
import moment from 'moment';
import { createLocalVue } from '@vue/test-utils';
import orderApiService from '@/api/orderService';
import store from '@/store';

describe('@state/modules/warehouse/orderEntry', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const orderAddSuccess = true;
  const list = [{}, {}];
  const filters = { page: 1 };
  const orderToSave = {
    consignee: 1, productCode: 'ROS', productDescription: 'Red Roses', numberUnits: 10, shipDate: new Date()
  };

  const orderEntrySaveAction = 'orderEntry/save';
  const orderEntrySaveMutation = 'orderEntry/SAVE';
  const orderEntrySetOrdersMutation = 'orderEntry/SET_ORDERS';

  describe('orderEntry in a store mutations', () => {
    it('mutations.SAVE correctly sets state', () => {
      expect(store.state.orderEntry.orderAddSuccess).toBe(false);
      store.commit(orderEntrySaveMutation, orderAddSuccess);
      expect(store.state.orderEntry.orderAddSuccess).toBe(orderAddSuccess);
      expect.assertions(2);
    });

    it('mutations.SET_ORDERS correctly sets state', () => {
      expect(store.state.orderEntry.list.length).toBe(0);
      store.commit(orderEntrySetOrdersMutation, { ordersList: list });
      expect(store.state.orderEntry.list.length).toBe(list.length);
      expect.assertions(2);
    });
  });
  describe('orderEntry In a store Actions', () => {
    it(' calls actions[orderEntry/search]  successfully', () => {
      orderApiService.search = jest.fn().mockImplementation(() => Promise.resolve({ data: list }));
      return store.dispatch('orderEntry/search', filters).then(() => {
        store.commit(orderEntrySetOrdersMutation, { ordersList: [] });
        expect(orderApiService.search).toHaveBeenCalled();
      });
    });

    it(' calls actions[orderEntry/setSummaryFilters] successfully', () => {
      store.dispatch('orderEntry/setSummaryFilters', filters);
      expect(store.state.orderEntry.actualFilters.page).toEqual(filters.page);
    });
    it(' calls actions[orderEntry/findUnits]  successfully', async () => {
      orderApiService.findUnits = jest.fn().mockImplementation(() => Promise.resolve({ data: list }));
      await store.dispatch('orderEntry/findUnits', filters);
      expect(orderApiService.findUnits).toHaveBeenCalled();
    });
    it(' calls actions[orderEntry/save]  successfully', () => {
      const responseSave = { message: 'ok' };
      orderApiService.save = jest.fn().mockImplementation(() => Promise.resolve(responseSave));
      return store.dispatch(orderEntrySaveAction, orderToSave).then((response) => {
        store.commit(orderEntrySaveMutation, false);
        expect(orderApiService.save).toHaveBeenCalled();
        expect(responseSave).toEqual(response);
        expect.assertions(2);
      });
    });

    it('calls actions[orderEntry/search] error flow', () => {
      const orderSearchError = { error: new Error() };
      orderApiService.search = jest.fn().mockImplementation(() => Promise.reject(orderSearchError));
      store.dispatch('orderEntry/search', filters).then((response) => {
        store.commit(orderEntrySetOrdersMutation, { ordersList: [] });
        expect(orderApiService.search).toHaveBeenCalled();
        expect(store.state.orderEntry.list.length).toBe(0);
        expect(store.state.orderEntry.orderAddSuccess).toEqual(false);
        expect(response).toEqual(orderSearchError);
        expect.assertions(2);
      }).catch(() => {});
    });
    it('calls actions[orderEntry/save] error flow', () => {
      const responseSave = new Error();
      orderApiService.save = jest.fn().mockImplementation(() => Promise.reject(responseSave));
      return store.dispatch(orderEntrySaveAction, orderToSave).then(() => {}).catch((response) => {
        store.commit(orderEntrySaveMutation, false);
        expect(orderApiService.save).toHaveBeenCalled();
        expect(store.state.orderEntry.orderAddSuccess).toBe(false);
        expect(responseSave).toEqual(response);
        expect.assertions(3);
      });
    });

    it('calls actions[orderEntry/finalize] successfully', async () => {
      const responseFinalize = { message: 'ok' };
      orderApiService.finalizeShipments = jest.fn().mockImplementation(() => Promise.resolve(responseFinalize));
      const response = await store.dispatch('orderEntry/finalize');
      expect(orderApiService.finalizeShipments).toHaveBeenCalled();
      expect(response).toEqual(responseFinalize);
      expect.assertions(2);
    });

    it('calls actions[orderEntry/finalize] error flow', async () => {
      const responseFinalize = new Error();
      orderApiService.finalizeShipments = jest.fn().mockImplementation(() => Promise.reject(responseFinalize));
      try {
        await store.dispatch('orderEntry/finalize');
      } catch (error) {
        expect(error).toEqual(responseFinalize);
      }
      expect(orderApiService.finalizeShipments).toHaveBeenCalled();
      expect.assertions(2);
    });

    it('calls actions[orderEntry/changeShipDate] normal flow', async () => {
      const newShipDate = moment();
      orderApiService.changeShipDate = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }));
      await store.dispatch('orderEntry/changeShipDate', newShipDate.toDate());
      expect(orderApiService.changeShipDate).toHaveBeenCalled();
    });

    it('calls actions[orderEntry/update] successfully', () => {
      const responseUpdate = { message: 'ok' };
      const unitsConsolidateId = 623131;
      const orderToUpdate = {
        consigneeAccountId: 122,
        productCode: 'ROSS',
        productDescription: 'ROSES RED 45cm',
        poNumber: '812391'
      };
      orderApiService.update = jest.fn().mockImplementation(() => Promise.resolve(responseUpdate));
      return store.dispatch('orderEntry/update', { unitsConsolidateId, orderToUpdate }).then((response) => {
        expect(orderApiService.update).toHaveBeenCalled();
        expect(response).toEqual(responseUpdate);
        expect(store.state.orderEntry.orderUpdateSuccess).toBe(true);
        expect.assertions(3);
      });
    });

    it('calls actions[orderEntry/update] error flow', () => {
      const responseUpdate = new Error();
      const unitsConsolidateId = 623131;
      const orderToUpdate = {
        consigneeAccountId: 122,
        productCode: 'ROSS',
        productDescription: 'ROSES RED 45cm',
        poNumber: '812391'
      };
      orderApiService.update = jest.fn().mockImplementation(() => Promise.resolve(responseUpdate));
      return store.dispatch('orderEntry/update', { unitsConsolidateId, orderToUpdate }).catch((error) => {
        expect(orderApiService.update).toHaveBeenCalled();
        expect(responseUpdate).toEqual(error);
        expect(store.state.orderEntry.orderUpdateSuccess).toBe(false);
        expect.assertions(3);
      });
    });
  });
});

describe('@state/modules/warehouse/orderEntry print actions', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it('calls actions[orderEntry/printUnit] normal flow', async () => {
    const unitId = 233991;
    const response = { data: 'blobfile' };
    orderApiService.printUnit = jest.fn().mockImplementation(() => Promise.resolve(response));
    const printResponse = await store.dispatch('orderEntry/printUnit', unitId);
    expect(orderApiService.printUnit).toHaveBeenCalled();
    expect(response).toEqual(printResponse);
    expect.assertions(2);
  });

  it('calls actions[orderEntry/printUnitsConsolidate] normal flow', async () => {
    const unitConsolidateId = 5991;
    const response = { data: 'blobfile' };
    orderApiService.printUnitsConsolidate = jest.fn().mockImplementation(() => Promise.resolve(response));
    const printResponse = await store.dispatch('orderEntry/printUnitsConsolidate', unitConsolidateId);
    expect(orderApiService.printUnitsConsolidate).toHaveBeenCalled();
    expect(response).toEqual(printResponse);
    expect.assertions(2);
  });

  it('calls actions[orderEntry/printLabelsMassive] normal flow', async () => {
    const response = { data: 'blobfile' };
    orderApiService.printLabelsMassive = jest.fn().mockImplementation(() => Promise.resolve(response));
    const printResponse = await store.dispatch('orderEntry/printLabelsMassive');
    expect(orderApiService.printLabelsMassive).toHaveBeenCalled();
    expect(response).toEqual(printResponse);
    expect.assertions(2);
  });

  it('calls actions[orderEntry/printShippingManifest] normal flow', async () => {
    const response = { data: 'blobfile' };
    orderApiService.printShippingManifest = jest.fn().mockImplementation(() => Promise.resolve(response));
    const printResponse = await store.dispatch('orderEntry/printShippingManifest');
    expect(orderApiService.printShippingManifest).toHaveBeenCalled();
    expect(response).toEqual(printResponse);
    expect.assertions(2);
  });
});

describe('@state/modules/warehouse/orderEntry delete actions', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it('calls actions[orderEntry/deleteUnit] normal flow', async () => {
    const unitId = 2225991;
    const response = { data: {}, message: 'OK' };
    orderApiService.deleteUnit = jest.fn().mockImplementation(() => Promise.resolve(response));
    const deleteResponse = await store.dispatch('orderEntry/deleteUnit', unitId);
    expect(orderApiService.deleteUnit).toHaveBeenCalled();
    expect(response).toEqual(deleteResponse);
    expect.assertions(2);
  });

  it('calls actions[orderEntry/delete] successfully', async () => {
    const response = { message: 'ok' };
    const unitConsolidateId = 623131;
    orderApiService.deleteShipments = jest.fn().mockImplementation(() => Promise.resolve(response));
    const responseDelete = await store.dispatch('orderEntry/delete', unitConsolidateId);
    expect(orderApiService.deleteShipments).toHaveBeenCalled();
    expect(response).toEqual(responseDelete);
    expect.assertions(2);
  });
});

describe('@state/modules/warehouse/orderEntry get settings actions', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });
  const getCutoffLimitDateNewShipdateAction = 'orderEntry/getCutoffLimitDateNewShipdate';
  const getCutoffLimitDateAction = 'orderEntry/getCutoffLimitDate';

  it('calls actions[orderEntry/getSettings] normal flow', async () => {
    const shipDateFutureDays = 8;
    const shipperAccountNumber = 'SHIPPR2121';
    const shipperAccountName = 'Shipper Tests 2121';
    orderApiService.getSettings = jest.fn().mockImplementation(() => Promise.resolve({ data: { shipDateFutureDays } }));
    store.commit('SET_GROUPS', [shipperAccountNumber]);
    store.commit('SET_SHIPPER_ACCOUNT', { number: shipperAccountNumber, name: shipperAccountName });
    await store.dispatch('orderEntry/getSettings');
    expect(store.state.orderEntry.settings.shipDateFutureDays).toBe(shipDateFutureDays);
    expect(orderApiService.getSettings).toHaveBeenCalledWith(shipperAccountNumber);
    expect.assertions(2);
  });

  it('calls actions[orderEntry/getCutoffLimitDate]  successfully', async () => {
    const limitDateTime = moment().subtract(1, 'day').format();
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: limitDateTime }));
    await store.dispatch(getCutoffLimitDateAction);
    expect(store.state.orderEntry.cutoff.limitDateMillis).toBe(0);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('calls actions[orderEntry/getCutoffLimitDate] successfully with margin', async () => {
    const cutoffDateTime = moment().add(2, 'Hours').format();
    const currentDateTime = moment().format();
    const twoHoursMillisMargin = 7128000;
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: { cutoffDateTime, currentDateTime } }));
    await store.dispatch(getCutoffLimitDateAction);
    expect(store.state.orderEntry.cutoff.limitDateMillis > twoHoursMillisMargin).toBe(true);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('calls actions[orderEntry/getCutoffLimitDate] no data returned', async () => {
    const cutoffDateTime = null;
    const currentDateTime = null;
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: { cutoffDateTime, currentDateTime } }));
    await store.dispatch(getCutoffLimitDateAction);
    expect(store.state.orderEntry.cutoff.limitDateMillis).toBe(0);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('calls actions[orderEntry/getCutoffLimitDateNewShipdate] 3 scenarios successfully', async () => {
    // Test with the limit cutoff time is before the current date time.
    const shipDate = moment();
    let cutoffDateTime = moment().subtract(1, 'day').format();
    const currentDateTime = moment().format();
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: { cutoffDateTime, currentDateTime } }));
    await store.dispatch(getCutoffLimitDateNewShipdateAction, shipDate);
    expect(store.state.orderEntry.cutoff.limitDateMillisNewShipDate).toBe(0);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();
    // Test with the limit cutoff time is after the current date time.
    cutoffDateTime = moment().add(2, 'hours').format();
    const twoHoursMillisMargin = 7128000;
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: { cutoffDateTime, currentDateTime } }));
    await store.dispatch(getCutoffLimitDateNewShipdateAction, shipDate);
    expect(store.state.orderEntry.cutoff.limitDateMillisNewShipDate > twoHoursMillisMargin).toBe(true);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();
    // Test with a null API response.
    cutoffDateTime = null;
    orderApiService.getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: { cutoffDateTime, currentDateTime } }));
    await store.dispatch(getCutoffLimitDateNewShipdateAction, shipDate);
    expect(store.state.orderEntry.cutoff.limitDateMillisNewShipDate).toBe(0);
    expect(orderApiService.getCutoffLimitDate).toHaveBeenCalled();

    expect.assertions(6);
  });

  it('calls actions[orderEntry/setCutoffClosed] normal flow', async () => {
    const isCutoffClosed = true;
    await store.dispatch('orderEntry/setCutoffClosed', isCutoffClosed);
    expect(store.state.orderEntry.cutoff.isClosed).toBe(isCutoffClosed);
  });

  it('calls actions[orderEntry/setFilterShipDateDisabled] normal flow', async () => {
    const filterShipDateDisabled = true;
    await store.dispatch('orderEntry/setFilterShipDateDisabled', filterShipDateDisabled);
    expect(store.state.orderEntry.filterShipDateDisabled).toBe(filterShipDateDisabled);
  });
});
