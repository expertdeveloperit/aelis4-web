import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import NoUserConfig from '@/views/noUserConfig';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/NoUserConfig', () => {
  it('Renders NoUserConfig succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const element = mount(NoUserConfig, { store, localVue, i18n });
    expect(element.find('.no-user-config-container').exists()).toBe(true);
  });
});
