import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import PrintUnitConsolidateLabel from '@/views/warehouse/orderEntry/components/tableSummary/PrintUnitConsolidateLabel';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/components/tableSummary/PrintUnitConsolidateLabel', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  it('Renders PrintUnitConsolidateLabel succesfully', () => {
    const element = mount(PrintUnitConsolidateLabel, { store, localVue, i18n });
    expect(element.find('.el-icon-printer').exists()).toBe(true);
  });

  it('Calls print succesfully', () => {
    const orderEntryPrintUnitsConsolidate = jest.fn().mockImplementation(() => Promise.resolve({ response: { data: [] } }));
    store._actions['orderEntry/printUnitsConsolidate'] = [orderEntryPrintUnitsConsolidate];
    const element = mount(PrintUnitConsolidateLabel, { store, localVue, i18n });
    element.vm.print();
    expect(orderEntryPrintUnitsConsolidate).toHaveBeenCalled();
  });
});
