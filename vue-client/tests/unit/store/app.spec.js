import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
import { createLocalVue } from '@vue/test-utils';
import appModule from '@/store/modules/app';

describe('@state/modules/app', () => {
  it('exports a valid Vuex module', () => {
    expect(appModule).toBeAVuexModule();
  });

  let store;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(appModule));
  });

  describe('in a store mutations', () => {
    it('mutations.TOGGLE_SIDEBAR correctly sets state open', () => {
      expect(store.state.sidebar.opened).toBe(true);
      store.commit('TOGGLE_SIDEBAR');
      expect(store.state.sidebar.opened).toBe(false);
      expect.assertions(2);
    });

    it('mutations.CLOSE_SIDEBAR correctly sets state open', () => {
      store.commit('CLOSE_SIDEBAR');
      expect(store.state.sidebar.opened).toBe(false);
    });

    it('mutations.TOGGLE_DEVICE correctly sets state device', () => {
      const device = 'divice_test';
      store.commit('TOGGLE_DEVICE', device);
      expect(store.state.device).toBe(device);
    });

    it('actions.ToggleSideBar calls mutation and sets correct state', () => {
      store.dispatch('ToggleSideBar');
      expect(store.state.sidebar.opened).toBe(false);
    });
    it('actions.CloseSideBar calls mutation and sets correct state', () => {
      store.dispatch('CloseSideBar', { withoutAnimation: false });
      expect(store.state.sidebar.opened).toBe(false);
    });
    it('actions.ToggleDevice calls mutation and sets correct state', () => {
      const device = 'divice_test';
      store.dispatch('ToggleDevice', device);
      expect(store.state.device).toBe(device);
    });
  });
});
