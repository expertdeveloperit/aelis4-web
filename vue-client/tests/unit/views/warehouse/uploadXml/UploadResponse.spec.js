import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import UploadResponse from '@/views/warehouse/uploadXml/UploadResponse';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/uploadXml/UploadResponse', () => {
  it('Renders UploadResponse succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const element = mount(UploadResponse, { store, localVue, i18n });
    expect(element.find('#xml-upload-response-collapsible').exists()).toBe(true);
    expect(element.find('#header-response').exists()).toBe(true);
  });

  it('Call action on destroy', () => {
    const clearXmlResponse = jest.fn();
    store._actions.clearXmlResponse = [clearXmlResponse];
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const element = mount(UploadResponse, { store, localVue, i18n });
    element.destroy();
    expect(clearXmlResponse).toHaveBeenCalled();
  });
});
