const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  uploadXmlResponse: state => state.uploadXml.response,
  user: state => state.user,
  orderEntry: state => state.orderEntry,
  shippers: state => state.account.shippers,
  extensionRequest: state => state.extensionRequest
};
export default getters;
