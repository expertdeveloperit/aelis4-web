import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueCountdown from '@chenfengyuan/vue-countdown';
import CountdownCutoff from '@/views/warehouse/orderEntry/CountdownCutoff';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/CountdownCutoff', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.component(VueCountdown.name, VueCountdown);
  });

  it('Renders CountdownCutoff succesfully', () => {
    const element = mount(CountdownCutoff, { store, localVue, i18n });
    console.log(element.html());
    expect(element.find('.count-down-piece').exists()).toBe(true);
    expect(element.find('.count-down-container').exists()).toBe(true);
    expect(element.find('.count-down-message').exists()).toBe(true);
    expect.assertions(3);
  });

  it('Calls end succesfully', () => {
    const element = mount(CountdownCutoff, { store, localVue, i18n });
    element.vm.end();
    expect(element.vm._data.showEndMessage).toBe(true);
  });

  it('Calls start succesfully', () => {
    const element = mount(CountdownCutoff, { store, localVue, i18n });
    element.vm.start();
    expect(element.vm._data.showEndMessage).toBe(false);
  });
});
