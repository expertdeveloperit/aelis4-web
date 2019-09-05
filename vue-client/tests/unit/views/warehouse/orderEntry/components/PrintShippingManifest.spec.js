import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import PrintShippingManifest from '@/views/warehouse/orderEntry/components/PrintShippingManifest';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/components/PrintShippingManifest', () => {
  let localVue;
  const list = [{ id: 12 }, { id: 44 }];
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  it('Renders PrintShippingManifest succesfully', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(PrintShippingManifest, { store, localVue, i18n });
    expect(element.find('#btn-print-shipping-manifest').exists()).toBe(true);
  });

  it('Calls handlePrint succesfully', async () => {
    const orderEntrySearch = jest.fn();
    const printShippingManifest = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    store._actions['orderEntry/printShippingManifest'] = [printShippingManifest];
    store._actions['orderEntry/search'] = [orderEntrySearch];
    const element = mount(PrintShippingManifest, { store, localVue, i18n });

    await element.vm.handlePrint();
    expect(printShippingManifest).toHaveBeenCalled();
    expect(orderEntrySearch).toHaveBeenCalled();
    expect.assertions(2);
  });
});
