import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import Navbar from '@/views/layout/components/Navbar';
import store from '@/store';
import i18n from '@/lang';
import AuthPlugin from '@/plugins/auth';
import authService from '@/utils/auth/auth0Service';

describe('@/views/layout/Navbar', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Router);
    localVue.use(ElementUI);
    localVue.use(AuthPlugin);
  });

  it(' renders Navbar succesfully and call sucessfully toggle sidebar', () => {
    const ToggleSideBar = jest.fn();
    store._actions.ToggleSideBar = [ToggleSideBar];
    const router = new Router();
    const element = mount(Navbar, {
      store, localVue, router, i18n
    });

    expect(element.find('.navbar').exists()).toBe(true);

    // We tests that method toggleSideBar calls the action.
    element.vm.toggleSideBar();
    expect(ToggleSideBar).toHaveBeenCalled();
  });

  it(' Call handleLogOut method successfully', () => {
    const LogOut = jest.fn();
    const router = new Router();
    const element = mount(Navbar, {
      store, localVue, router, i18n
    });
    element.setData({ $auth: { logOut: LogOut } });
    // We tests that method logout calls the action.
    element.vm.handleLogOut();
    expect(LogOut).toHaveBeenCalled();
  });

  it(' Call handleLoginEvent method successfully', () => {
    const routerPushToHome = jest.fn();
    const router = new Router();
    router.replace = routerPushToHome;
    const element = mount(Navbar, {
      store, localVue, router, i18n
    });
    // We tests that method logout calls the action.
    element.vm.handleLoginEvent({ loggedIn: false });
    expect(routerPushToHome).toHaveBeenCalled();
  });

  it(' Call handleChangePassword method successfully', async () => {
    // Give this configuration:
    const isGoogleAppsUser = false;
    store.commit('SET_IS_GOOGLE_APPS_USER', isGoogleAppsUser);
    const changePassword = jest.fn().mockImplementation(() => Promise.resolve({ message: 'Ok' }));
    authService.changePassword = changePassword;
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(Navbar, {
      store, localVue, i18n
    });
    element.setData({
      $confirm: confirm
    });

    // When the method change password is called.
    await element.vm.handleChangePassword();

    // Then the method authService.changePassword have to been called.
    expect(changePassword).toHaveBeenCalled();
  });
});
