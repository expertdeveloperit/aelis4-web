import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import Dashboard from '@/views/dashboard';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/dashboard', () => {
  it('Renders dashboard succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const element = mount(Dashboard, { store, localVue, i18n });
    expect(element.find('.dashboard-text').exists()).toBe(true);
  });
});
