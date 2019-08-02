import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SidebarItem from '@/views/layout/components/Sidebar/SidebarItem';
import authRoles from '@/utils/auth/roles';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/layout/components/Sidebar/SidebarItem', () => {
  let localVue;
  const roles = ['Internal'];
  store.commit('SET_ROLES', roles);
  beforeEach(() => {
    store.commit('SET_ROLES', roles);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  const dashboardComponent = '@/views/dashboard/index';

  it('renders SidebarItem succesfully one children', () => {
    const item = {
      path: '/',
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: false,
      meta: {
        title: 'dashboard', icon: 'example', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.SHIPPER]
      },
      children: [{
        path: 'dashboard',
        component: () => import(dashboardComponent),
        meta: {
          title: 'dashboard', icon: 'example', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.SHIPPER]
        },
      }]
    };

    const element = shallowMount(SidebarItem, {
      clone: false,
      propsData: {
        item,
        key: item.path,
        basePath: item.path
      },
      store,
      localVue,
      i18n
    });
    expect(element.find('.menu-wrapper').exists()).toBe(true);
    expect(element.find('div').exists()).toBe(true);
  });

  it('hasOneShowingChild test return value', () => {
    const item = {
      path: '/',
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: false,
      children: [{
        path: 'dashboard',
        component: () => import(dashboardComponent)
      }, {
        path: 'dashboard2',
        component: () => import(dashboardComponent)
      }
      ]
    };

    const element = shallowMount(SidebarItem, {
      clone: false,
      propsData: {
        item,
        key: item.path,
        basePath: item.path
      },
      store,
      localVue,
      i18n
    });
    // 2 children
    expect(element.vm.hasOneShowingChild(item.children, item)).toBe(false);

    // 2 children with 1 hide
    item.children[0].hidden = true;
    expect(element.vm.hasOneShowingChild(item.children, item)).toBe(true);

    // With no children
    item.children = [];
    expect(element.vm.hasOneShowingChild(item.children, item)).toBe(true);
  });
});
