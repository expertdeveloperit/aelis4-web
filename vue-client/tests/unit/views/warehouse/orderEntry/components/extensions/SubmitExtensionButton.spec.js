import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SubmitExtensionButton from '@/views/warehouse/orderEntry/components/extensions/SubmitExtensionButton';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/orderEntry/components/extensions/SubmitExtensionButton', () => {
  let localVue;
  const list = [{ id: 12 }, { id: 44 }];

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  const formShippingHour = '#form-extensions-shipping-hour';
  const formApplicantName = '#form-extensions-applicant-name';
  const formContactNumber = '#form-extensions-contact-number';
  const formEmail = '#form-extensions-email';
  const isErrorClass = '.is-error';

  it('Renders SubmitExtensionButton succesfully', () => {
    store.commit('orderEntry/SET_ORDERS', { ordersList: list });
    const element = mount(SubmitExtensionButton, { store, localVue, i18n });
    expect(element.find('#btn-open-dialog-submit-extension').exists()).toBe(true);
  });

  it('Calls handleSubmit SubmitExtensionButton succesfully', (done) => {
    // Given: The following config
    const doneAction = jest.fn();
    const setIsCreatingExtension = jest.fn();
    const extensions = jest.fn().mockImplementation(() => Promise.resolve({ message: 'ok' }));
    const confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
    const settings = {
      shipDateFutureDays: 8, warehouseCode: 'AEL', shipperAccountId: 1, cutoffHourForToday: '22:00:00'
    };
    store._actions['extensions/submit'] = [extensions];
    store._actions['orderEntry/setIsCreatingExtension'] = [setIsCreatingExtension];
    store.commit('orderEntry/SET_SETTINGS', settings);
    const element = mount(SubmitExtensionButton, { store, localVue, i18n });
    element.setData({
      $confirm: confirm,
      dialogVisible: true,
      form: {
        shipDate: new Date(),
        shippingHour: '22:00',
        applicantName: 'Shipper Test user',
        contactNumber: '(309) 288817-22'
      }
    });
    const selectedByConsignee = {
      201: {
        consigneeAccountName: 'Consignee Test 1',
        totalUnits: 20,
        consolidations: [
          {
            id: 11, total: 12, totalChecked: 12, units: []
          },
          {
            id: 12, total: 8, totalChecked: 8, units: []
          },
        ]
      }
    };
    store.commit('extensions/UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);

    element.vm.handleOpen();
    element.vm.$nextTick(async () => {
      element.find(formShippingHour).setValue('22:00');
      element.find(formShippingHour).trigger('blur');
      element.find(formApplicantName).setValue('Shipper Test user');
      element.find(formApplicantName).trigger('blur');
      element.find(formContactNumber).setValue('(309) 288817-22');
      element.find(formContactNumber).trigger('blur');
      element.find(formEmail).setValue('test@gmail.com');
      element.find(formEmail).trigger('blur');
      expect(element.find(isErrorClass).exists()).toBe(false);
      await element.vm.handleSubmit();
      expect(extensions).toHaveBeenCalled();
      expect(setIsCreatingExtension).toHaveBeenCalled();
      element.vm.handleClose(done);
      expect(doneAction).toHaveBeenCalled();
      done();
    });
    expect.assertions(4);
  });
});
