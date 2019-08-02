import ElementUI from 'element-ui';
import VueMoment from 'vue-moment';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueCountdown from '@chenfengyuan/vue-countdown';
import Orderentry from '@/views/warehouse/orderEntry';
import store from '@/store';
import i18n from '@/lang';
import alphanumericValidation from '@/directives/alphanumericValidation';

describe('@/views/warehouse/Orderentry', () => {
  it('Renders Orderentry succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    localVue.use(VueMoment);
    localVue.component(VueCountdown.name, VueCountdown);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
    const element = shallowMount(Orderentry, { store, localVue, i18n });
    expect(element.find('.app-view-title').exists()).toBe(true);
  });
});
