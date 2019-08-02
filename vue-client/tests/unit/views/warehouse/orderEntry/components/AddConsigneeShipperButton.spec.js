import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import AddConsigneeShipperButton from '@/views/warehouse/orderEntry/components/AddConsigneeShipperButton';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/components/AddConsigneeShipperButton', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  const clearLocalModel = jest.fn();
  const dataElement = {
    $refs:
    {
      'add-consignee-autocomplete': { clearLocalModel, $el: { getElementsByTagName: () => [{ focus: jest.fn() }] } }
    }
  };

  it('Renders AddConsigneeShipperButton succesfully', () => {
    const element = mount(AddConsigneeShipperButton, { store, localVue, i18n });
    expect(element.find('#btn-open-dialog-add-consignee-shipper').exists()).toBe(true);
  });

  it('Calls handleClose and clear succesfully', () => {
    const done = jest.fn();
    const element = mount(AddConsigneeShipperButton, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleClose(done);
    expect(done).toHaveBeenCalled();
    expect(clearLocalModel).toHaveBeenCalled();
    expect(element.vm.consigneeSelected).toEqual({});
    expect(element.vm.consigneeAccountId).toEqual(null);
    expect.assertions(4);
  });

  it('Calls handleSearch and clear succesfully', () => {
    const item = {
      name: 'KENNICOT BR',
      number: '77312889',
      address: '3791 Newburg RD',
      state: 'Louisville',
      city: 'NY',
      zipCode: '40218',
      phone: '(305) 738 - 2312',
      daysOfService: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false
      }
    };

    const element = mount(AddConsigneeShipperButton, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleSearch(item);
    expect(clearLocalModel).toHaveBeenCalled();
    expect(element.vm.consigneeSelected).toEqual(item);
    expect(element.vm.consigneeAccountId).toEqual(null);
    expect.assertions(3);
  });

  it('Calls handleAddConsigneeShipperRelation succesfully', async () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: [], total: 0, filters: { page: 1, shipperAccountId: 12 } });
    const responseApiAddConsigneeShipperRelation = { message: 'OK' };
    const addConsigneeShipperRelation = jest.fn().mockImplementation(() => Promise.resolve(responseApiAddConsigneeShipperRelation));
    store._actions['account/addConsigneeShipperRelation'] = [addConsigneeShipperRelation];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(AddConsigneeShipperButton, { store, localVue, i18n });
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    element.setData({ consigneeSelected: { id: 44 } });

    await element.vm.handleAddConsigneeShipperRelation();
    expect(confirm).toHaveBeenCalled();
    expect(addConsigneeShipperRelation).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('Calls handleAddConsigneeShipperRelation reject', async () => {
    const responseApiAddConsigneeShipperRelation = { response: { data: { message: 'error' } } };
    const addConsigneeShipperRelation = jest.fn().mockImplementation(() => Promise.reject(responseApiAddConsigneeShipperRelation));
    store._actions['account/addConsigneeShipperRelation'] = [addConsigneeShipperRelation];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const message = jest.fn();
    const element = mount(AddConsigneeShipperButton, { store, localVue, i18n });
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    element.setData({ $message: message });

    await element.vm.handleAddConsigneeShipperRelation();
    expect(confirm).toHaveBeenCalled();
    expect(addConsigneeShipperRelation).toHaveBeenCalled();
    expect.assertions(2);
  });
});
