const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  uploadXmlResponse: state => state.uploadXml.response,
  user: state => state.user,
  orderEntry: state => state.orderEntry,
  shippers: state => state.account.shippers,
  extensions: state => state.extensions,
  extensionRequest: state => state.extensionRequest,
  hasOrderConsolidations: state => state.orderEntry.list && state.orderEntry.list.length > 0
};
export default getters;
