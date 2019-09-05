import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UploadDrop from '@/views/warehouse/uploadXml/UploadDrop';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/uploadXml/UploadDrop', () => {
  const uploadXmlClass = '.upload-xml';
  const xmlExtension = '.xml';
  const fileXmlName = 'file.xml';
  const xmlExtensionText = 'text/xml';
  const fielSize = 5000;
  const fielSizeExceded = 50005000;

  it('Renders UploadDrop succesfully and handle success', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const SetUploadXmlResponse = jest.fn();
    store._actions.SetUploadXmlResponse = [SetUploadXmlResponse];
    const messageError = jest.fn();
    const clearFiles = jest.fn();
    const element = shallowMount(UploadDrop, { store, localVue, i18n });
    element.setData({ $message: { error: messageError } });
    element.setData({ $refs: { upload: { clearFiles } } });

    // We tests that element dom its created.
    const uploadXml = element.find(uploadXmlClass);
    expect(uploadXml.exists()).toBe(true);
    expect(uploadXml.attributes().accept).toBe(xmlExtension);

    // We tests that method handleSuccess calls the action SetUploadXmlResponse.
    element.vm.handleSuccess({}, { name: fileXmlName });
    expect(SetUploadXmlResponse).toHaveBeenCalled();

    // We tests that method handleBeforeUpload that verify type and size.
    expect(element.vm.handleBeforeUpload({ type: xmlExtensionText, size: fielSize })).toBe(true);
    expect(element.vm.handleBeforeUpload({ type: null, size: fielSize })).toBe(false);
    expect(element.vm.handleBeforeUpload({ type: xmlExtensionText, size: fielSizeExceded })).toBe(false);

    // Test handle error espect that update the processing to false and calls the message error.
    element.vm.handleError({ message: '{"message":"Shipper Invalid"}' });
    expect(element.vm._data.processing).toBe(false);
    expect(messageError).toHaveBeenCalled();

    // Test handleOpenSearch method. Espect that is Minimized set to false, and reset the upload process
    // and calls to clear files.
    element.vm.handleOpenSearchFile();
    expect(element.vm._data.isMinimized).toBe(false);
    expect(element.vm._data.uploadProgress).toBe(0);
    expect(clearFiles).toHaveBeenCalled();

    // Test handleMinimized method. Espect that is Minimized update data.
    element.find('.collapse-drop-zone').trigger('click');
    expect(element.vm._data.isMinimized).toBe(true);

    // Test handleProgress method. Espect that set to processing, and update uploadProgress.
    element.vm.handleProgress({}, {}, [{ percentage: 50 }]);
    expect(element.vm._data.processing).toBe(true);
    expect(element.vm._data.uploadProgress).toBe(50);
  });
});
