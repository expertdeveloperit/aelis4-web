import Vuex from 'vuex';
import Router from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Callback from '@/components/Callback';
import i18n from '@/lang';
import store from '@/store';
import AuthPlugin from '@/plugins/auth';
import authService from '@/utils/auth/auth0Service';

describe('@/components/Callback', () => {
  const profile = {
    t_hash: 'aleWiH7vdaws9rwTR0C0rQ',
    aud: 'q2mFo4IkthhO3qfwGVtQ2K0OpdwNCXiu',
    email: 'drendon@kometsales.com',
    iss: 'https://armellini.auth0.com/',
    name: 'drendon@kometsales.com',
    nickname: 'drendon',
    nonce: 'UoHKS5gLrLdG0g6GsEnMXU8xE7XO5A6P',
    picture: 'https://s.gravatar.com/avatar/d3a5da950bcee4157f93be2823d2671c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdr.png'
  };
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(AuthPlugin);
    localVue.use(Vuex);
    localVue.use(Router);
  });

  it('Renders Callback succesfully', () => {
    const element = mount(Callback, { localVue, i18n });
    expect(element.find('.spinner').exists()).toBe(true);
  });

  it('Callback handleLoginEvent succesfully', () => {
    const setUserInfo = jest.fn();
    store._actions.setUserInfo = [setUserInfo];
    const router = new Router();
    const element = mount(Callback, {
      store, localVue, i18n, router
    });

    element.vm.handleLoginEvent({
      profile,
      state: {
        target: '/'
      }
    });
    expect(setUserInfo).toHaveBeenCalled();
  });

  it('Callback destroy event succesfully', () => {
    const loginEvent = 'loginEvent';
    const removeListener = jest.fn();
    authService.removeListener = removeListener;
    const router = new Router();
    const element = mount(Callback, {
      store, localVue, i18n, router
    });
    element.destroy();
    expect(removeListener).toHaveBeenCalledWith(loginEvent, element.vm.handleLoginEvent);
  });
});
