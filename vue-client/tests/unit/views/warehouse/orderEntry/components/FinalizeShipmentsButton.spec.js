import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FinalizeShipmentsButton from '@/views/warehouse/orderEntry/components/FinalizeShipmentsButton';
import store from '@/store';
import i18n from '@/lang';
import PermissionsPlugin from '@/plugins/permissions';

describe('@/views/warehouse/orderEntry/FinalizeShipmentsButton', () => {
  let localVue;
  const list = [{ id: 12 }, { id: 44 }];
  const permissions = ['finalizeBeforeCutOff:dataEntry', 'finalizeAfterCutOff:dataEntry'];

  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(PermissionsPlugin);
    localVue.use(ElementUI);
  });

  it('Renders FinalizeShipmentsButton succesfully', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(FinalizeShipmentsButton, { store, localVue, i18n });
    expect(element.find('#btn-finalize').exists()).toBe(true);
  });

  it('test mixin permissions if no permission sent and Not have permission', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(FinalizeShipmentsButton, { store, localVue, i18n });
    expect(element.vm.$can()).toBe(false);
    store.commit('SET_PERMISSIONS', []);
    expect(element.find('#btn-finalize').exists()).toBe(false);
    expect.assertions(2);
  });

  it('Calls handleFinalize succesfully', async () => {
    const orderEntrySearch = jest.fn();
    const orderEntryFinalize = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    store._actions['orderEntry/search'] = [orderEntrySearch];
    store._actions['orderEntry/finalize'] = [orderEntryFinalize];
    const element = mount(FinalizeShipmentsButton, { store, localVue, i18n });
    element.setData({ $confirm: confirm });

    await element.vm.handleFinalize();
    expect(orderEntryFinalize).toHaveBeenCalled();
    expect(orderEntrySearch).toHaveBeenCalled();
    expect.assertions(2);
  });
});
