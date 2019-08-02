import request from '@/utils/request';

const requestConfigService = {
  setShipperAccountNumberHeaderRequest(shipperAccountNumber) {
    request.defaults.headers.get.shipperAccountNumber = shipperAccountNumber;
    request.defaults.headers.post.shipperAccountNumber = shipperAccountNumber;
    request.defaults.headers.delete.shipperAccountNumber = shipperAccountNumber;
    request.defaults.headers.put.shipperAccountNumber = shipperAccountNumber;
  }
};

export default requestConfigService;
