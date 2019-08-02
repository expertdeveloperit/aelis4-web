import ElementUI from 'element-ui';
import moment from 'moment';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ChangeShipDateButton from '@/views/warehouse/orderEntry/components/ChangeShipDateButton';
import store from '@/store';
import i18n from '@/lang';
import PermissionsPlugin from '@/plugins/permissions';

describe('@/views/warehouse/orderEntry/components/ChangeShipDateButton', () => {
  let localVue;
  const permissions = ['changeShipDate:dataEntry'];
  beforeEach(() => {
    store.commit('SET_PERMISSIONS', permissions);
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(PermissionsPlugin);
    localVue.use(ElementUI);
  });

  const list = [{ id: 12 }, { id: 44 }];
  const resetForm = jest.fn();
  const handleFocusFirstElement = jest.fn();
  const dataElement = {
    $refs:
    {
      changeShipDateform:
        {
          resetFields: resetForm,
          $el: [{ focus: handleFocusFirstElement }]
        }
    }
  };

  it('Renders ChangeShipDateButton succesfully', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(ChangeShipDateButton, { store, localVue, i18n });
    expect(element.find('#btn-change-ship-date').exists()).toBe(true);
  });

  it('Calls handleOpen focus element with index 0 succesfully', () => {
    const element = mount(ChangeShipDateButton, { store, localVue, i18n });
    element.setData(dataElement);
    element.vm.handleOpen();
    element.vm.$nextTick(() => {
      expect(handleFocusFirstElement).toHaveBeenCalled();
    });
  });

  it('Calls handleClose succesfully', () => {
    const element = mount(ChangeShipDateButton, { store, localVue, i18n });
    const done = jest.fn();
    element.setData(dataElement);
    element.vm.handleClose(done);
    expect(done).toHaveBeenCalled();
  });

  it('Calls handleChangeShipDate succesfully', async () => {
    const limitDateTime = moment().add(2, 'hours').format();
    const limitDateTimeNewShipdate = moment().subtract(2, 'hours').format();
    const getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: limitDateTime }));
    const responseChangeShipDate = { data: { message: 'ok', total: 2 } };
    const getCutoffLimitDateNewShipdate = jest.fn().mockImplementation(() => Promise.resolve({ data: limitDateTimeNewShipdate }));
    const changeShipDate = jest.fn().mockImplementation(() => Promise.resolve(responseChangeShipDate));
    store._actions['orderEntry/getCutoffLimitDateNewShipdate'] = [getCutoffLimitDateNewShipdate];
    store._actions['orderEntry/getCutoffLimitDate'] = [getCutoffLimitDate];
    store._actions['orderEntry/changeShipDate'] = [changeShipDate];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(ChangeShipDateButton, { store, localVue, i18n });
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.changeShipDateform.validate = submitFormTrue;
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    const response = await element.vm.handleChangeShipDate();
    expect(response).toEqual(responseChangeShipDate);
    expect(confirm).toHaveBeenCalled();
    expect(changeShipDate).toHaveBeenCalled();
    expect.assertions(3);
  });

  it('Calls handleChangeShipDate error change shipdate', async () => {
    const limitDateTime = moment().add(2, 'hours').format();
    const limitDateTimeNewShipdate = moment().subtract(2, 'hours').format();
    const getCutoffLimitDate = jest.fn().mockImplementation(() => Promise.resolve({ data: limitDateTime }));
    const errorResponse = { response: { data: { message: 'Error' } } };
    const getCutoffLimitDateNewShipdate = jest.fn().mockImplementation(() => Promise.resolve({ data: limitDateTimeNewShipdate }));
    const changeShipDate = jest.fn().mockImplementation(() => Promise.reject(errorResponse));
    store._actions['orderEntry/getCutoffLimitDateNewShipdate'] = [getCutoffLimitDateNewShipdate];
    store._actions['orderEntry/getCutoffLimitDate'] = [getCutoffLimitDate];
    store._actions['orderEntry/changeShipDate'] = [changeShipDate];
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const element = mount(ChangeShipDateButton, { store, localVue, i18n });
    const submitFormTrue = jest.fn().mockImplementation(cb => cb(true));
    dataElement.$refs.changeShipDateform.validate = submitFormTrue;
    element.setData(dataElement);
    element.setData({ $confirm: confirm });
    try {
      await element.vm.handleChangeShipDate();
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
    expect(confirm).toHaveBeenCalled();
    expect(changeShipDate).toHaveBeenCalled();
    expect.assertions(3);
  });
});
