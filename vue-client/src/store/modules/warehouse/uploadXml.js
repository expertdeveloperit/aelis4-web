const collapsibleElement = 'xml-upload-response-collapsible';
const uploadXml = {
  state: {
    response: {
      header: {},
      details: [],
      activeElement: []
    }
  },
  mutations: {
    SET_XML_RESPONSE: (state, response) => {
      if (response) {
        state.response.details = response.ResponseDetail || [];
        state.response.header.fileName = response.fileName;
        state.response.header.orderNumber = response.ResponseHeader.orderNumber;
        state.response.header.shipdate = response.ResponseHeader.Shipdate;
        state.response.header.shipper = response.ResponseHeader.Shipper;
        state.response.header.totalUnitsInFile = response.ResponseHeader.totalUnitsInFile || 'N/A';
        state.response.header.totalUnitsSuccess = response.ResponseHeader.totalUnitsSuccess || '0';
        state.response.header.totalUnitsDuplicates = response.ResponseHeader.totalUnitsDuplicates || '0';
        state.response.header.totalUnitsDiscrepancy = response.ResponseHeader.totalUnitsDiscrepancy || '0';
        state.response.header.errorMessage = response.ResponseHeader.errorMessage;
        state.response.activeElement = [collapsibleElement];
      }
    },
    CLEAR_XML_RESPONSE: (state) => {
      state.response.details = [];
      state.response.header = {};
      state.response.activeElement = [];
    }
  },
  actions: {
    SetUploadXmlResponse: ({ commit }, response) => {
      commit('SET_XML_RESPONSE', response);
    },
    clearXmlResponse: ({ commit }) => {
      commit('CLEAR_XML_RESPONSE');
    }
  }
};

export default uploadXml;
