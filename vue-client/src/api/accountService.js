import request from '../utils/request';
import apiConstants from '../utils/apiConstants';

const accountService = {
  addConsigneeShipperRelation(shipperAccountId, consigneeAccountId) {
    return request({
      url: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER,
      method: 'post',
      data: { shipperAccountId, consigneeAccountId }
    });
  },
  getShippers(filters) {
    return request({
      url: apiConstants.END_POINTS.ACCOUNTS.SHIPPERS,
      method: 'get',
      params: filters
    });
  },
  signUpShipperUser(signUpInfo) {
    return request({
      url: apiConstants.END_POINTS.ACCOUNTS.SIGN_UP_USER_SHIPPER,
      method: 'post',
      data: signUpInfo
    });
  }
};

export default accountService;
