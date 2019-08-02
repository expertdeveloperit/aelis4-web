import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { cloneDeep } from 'lodash';
import uploadXml from '@/store/modules/warehouse/uploadXml';

describe('@state/modules/warehouse/uploadXml', () => {
  it('exports a valid Vuex module', () => {
    expect(uploadXml).toBeAVuexModule();
  });

  const collapsibleElement = 'xml-upload-response-collapsible';
  const response = {
    ResponseDetail: [{ id: 1 }, { id: 2 }],
    ResponseHeader: {
      fileName: 'file_test.xml',
      orderNumber: 'XML1829100',
      shipDate: '09/29',
      shipper: 'SHIPR2',
      totalUnitsInFile: 1000,
      totalUnitsSuccess: 995,
      totalUnitsDuplicates: '0',
      totalUnitsDiscrepancy: 5,
      errorMessage: null
    }
  };
  let store;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(uploadXml));
  });

  describe('SetUploadXmlResponse in a store actions', () => {
    it('action.SetUploadXmlResponse correctly sets state', () => {
      response.detail = [];
      store.dispatch('SetUploadXmlResponse', response);
      expect(store.state.response.activeElement).toEqual([collapsibleElement]);
      expect(store.state.response.details).toEqual(response.ResponseDetail);
      expect(store.state.response.header.fileName).toEqual(response.fileName);
      expect(store.state.response.header.orderNumber).toEqual(response.ResponseHeader.orderNumber);
      expect(store.state.response.header.shipdate).toEqual(response.ResponseHeader.Shipdate);
      expect(store.state.response.header.shipper).toEqual(response.ResponseHeader.Shipper);
      expect(store.state.response.header.totalUnitsInFile).toEqual(response.ResponseHeader.totalUnitsInFile);
      expect(store.state.response.header.totalUnitsSuccess).toEqual(response.ResponseHeader.totalUnitsSuccess);
      expect(store.state.response.header.totalUnitsDuplicates).toEqual(response.ResponseHeader.totalUnitsDuplicates);
      expect(store.state.response.header.totalUnitsDiscrepancy).toEqual(response.ResponseHeader.totalUnitsDiscrepancy);
      expect(store.state.response.header.errorMessage).toEqual(response.ResponseHeader.errorMessage);
      expect.assertions(11);
    });

    it('action.clearXmlResponse correctly sets state', () => {
      store.dispatch('clearXmlResponse');
      expect(store.state.response.details).toEqual([]);
      expect(store.state.response.header).toEqual({});
      expect(store.state.response.activeElement).toEqual([]);
      expect.assertions(3);
    });
  });
});
