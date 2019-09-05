import ElementUI from 'element-ui';
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import VueCountdown from '@chenfengyuan/vue-countdown';
import Orderentry from '@/views/warehouse/orderEntry';
import store from '@/store';
import i18n from '@/lang';
import alphanumericValidation from '@/directives/alphanumericValidation';
import PermissionsPlugin from '@/plugins/permissions';

describe('@/views/warehouse/Orderentry', () => {
  let localVue;
  const settings = {
    shipDateFutureDays: 8, warehouseCode: 'AEL', shipperAccountId: 1, cutoffHourForToday: '22:00:00'
  };
  const list = [{ id: 12 }, { id: 44 }];
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.use(VueMoment);
    localVue.use(PermissionsPlugin);
    localVue.component(VueCountdown.name, VueCountdown);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
    store.commit('orderEntry/SET_SUMMARY_FILTERS', { shipDate: new Date() });
    store.commit('orderEntry/SET_SETTINGS', settings);
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
  });

  it('Renders Orderentry succesfully', () => {
    const element = shallowMount(Orderentry, { store, localVue, i18n });
    expect(element.find('.app-view-title').exists()).toBe(true);
  });

  it('Renders Extension Request Button succesfully', (done) => {
    const element = mount(Orderentry, { store, localVue, i18n });
    element.vm.$nextTick(async () => {
      expect(element.find('#btn-extension-request').exists()).toBe(true);
      done();
    });
  });

  it('Calls extensionRequest succesfully', async () => {
    const extensionRequest = jest.fn();
    store._actions['orderEntry/setIsCreatingExtension'] = [extensionRequest];

    const element = mount(Orderentry, { store, localVue, i18n });
    element.vm.extensionRequest();
    expect(extensionRequest).toHaveBeenCalled();
    expect.assertions(1);
  });

  it('Renders More Actions Dropdown succesfully', (done) => {
    const element = mount(Orderentry, { store, localVue, i18n });
    element.vm.$nextTick(async () => {
      expect(element.find('#more-actions-dropdown').exists()).toBe(true);
      done();
    });
  });
});
