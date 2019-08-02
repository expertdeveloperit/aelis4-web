import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import PrintUnitLabel from '@/views/warehouse/orderEntry/components/unitsDetail/PrintUnitLabel';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/PrintUnitLabel', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  it('Renders PrintUnitLabel succesfully', () => {
    const element = mount(PrintUnitLabel, { store, localVue, i18n });
    expect(element.find('.el-icon-printer').exists()).toBe(true);
  });

  it('Calls print succesfully', () => {
    const orderEntryPrintUnits = jest.fn().mockImplementation(() => Promise.resolve({ response: { data: [] } }));
    store._actions['orderEntry/printUnit'] = [orderEntryPrintUnits];
    const element = mount(PrintUnitLabel, { store, localVue, i18n });
    element.vm.print();
    expect(orderEntryPrintUnits).toHaveBeenCalled();
  });
});
