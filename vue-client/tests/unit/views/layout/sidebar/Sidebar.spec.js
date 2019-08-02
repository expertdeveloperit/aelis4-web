import { shallowMount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import Sidebar from '@/views/layout/components/Sidebar';
import store from '@/store';

describe('@/views/layout/components/Sidebar', () => {
  it('renders Sidebar succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Router);
    const router = new Router();
    const ToggleSideBar = jest.fn();
    store._actions.ToggleSideBar = [ToggleSideBar];

    const element = shallowMount(Sidebar, { store, localVue, router });

    // We tests that element dom its created.
    expect(element.find('el-scrollbar').exists()).toBe(true);

    // We tests that method toggleSideBar calls the action correctly.
    element.vm.toggleSideBar();
    expect(ToggleSideBar).toHaveBeenCalled();
  });
});
