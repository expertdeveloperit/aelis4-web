import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UploadXml from '@/views/warehouse/uploadXml';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/warehouse/uploadXml', () => {
  it('Renders UploadXml succesfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
    const element = mount(UploadXml, { store, localVue, i18n });
    expect(element.find('#explanation').exists()).toBe(true);
    expect(element.find('#xml-upload-response-collapsible').exists()).toBe(true);
    expect(element.find('#xml-upload-download-template-link').exists()).toBe(true);
  });
});
