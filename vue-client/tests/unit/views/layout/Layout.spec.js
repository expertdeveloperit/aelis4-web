import { shallowMount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import Layout from '@/views/layout/Layout';
import store from '@/store';

describe('@/views/layout/Layout', () => {
  it('renders Layout succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Router);
    const router = new Router();
    const CloseSideBar = jest.fn();
    store._actions.CloseSideBar = [CloseSideBar];

    const element = shallowMount(Layout, { store, localVue, router });
    expect(element.find('.app-wrapper').exists()).toBe(true);
    window.dispatchEvent(new Event('resize'));

    // We tests that method handleClickOutside calls the action.
    element.vm.handleClickOutside();
    expect(CloseSideBar).toHaveBeenCalled();
  });
});
