import moment from 'moment';
import request from '@/utils/request';
import apiConstants from '@/utils/apiConstants';
import constants from '@/utils/constants';

/*
 Helper method to put correct format in field shipDate for the actions that requires the page filters.
*/
const getFiltersWithShipDateBackendFormat = (filters) => {
  const filtersUpdated = Object.assign({}, filters);
  filtersUpdated.shipDate = filters.shipDate || new Date();
  filtersUpdated.shipDate = moment(filtersUpdated.shipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
  return filtersUpdated;
};

const extensionService = {
  submit(extension) {
    extension.shipDate = moment(extension.shipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
    return request({
      url: apiConstants.END_POINTS.EXTENSIONS.SUBMIT,
      method: 'post',
      data: extension
    });
  },
  search(filters) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: apiConstants.END_POINTS.EXTENSIONS.SEARCH_EXTENSIONS,
      method: 'get',
      params: filtersUpdated
    });
  },
  getWarehouse() {
    return request({
      url: apiConstants.END_POINTS.WAREHOUSE.WAREHOUSE_CODES,
      method: 'get'
    });
  },
  getCutoffLimitDate(shipperAccountId, shipDate) {
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.CUTOFF,
      method: 'get',
      params: { shipperAccountId, shipDate }
    });
  },
  findUnits(filters) {
    return request({
      url: `${apiConstants.END_POINTS.EXTENSIONS.SEARCH_EXTENSIONS}/${filters.extensionNo}`,
      method: 'get',
      params: filters
    });
  },
};

export default extensionService;
