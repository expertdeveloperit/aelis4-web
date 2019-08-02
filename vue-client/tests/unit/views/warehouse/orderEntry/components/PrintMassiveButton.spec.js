import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import PrintMassiveButton from '@/views/warehouse/orderEntry/components/PrintMassiveButton';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/components/PrintMassiveButton', () => {
  let localVue;
  const list = [{ id: 12 }, { id: 44 }];
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  it('Renders PrintMassiveButton succesfully', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(PrintMassiveButton, { store, localVue, i18n });
    expect(element.find('#btn-print-massive').exists()).toBe(true);
  });

  it('Calls handlePrint succesfully', async () => {
    const orderEntrySearch = jest.fn();
    const printLabelsMassive = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    store._actions['orderEntry/printLabelsMassive'] = [printLabelsMassive];
    store._actions['orderEntry/search'] = [orderEntrySearch];
    const element = mount(PrintMassiveButton, { store, localVue, i18n });

    await element.vm.handlePrint();
    expect(printLabelsMassive).toHaveBeenCalled();
    expect(orderEntrySearch).toHaveBeenCalled();
    expect.assertions(2);
  });
});
