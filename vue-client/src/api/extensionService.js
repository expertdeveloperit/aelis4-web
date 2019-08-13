import moment from 'moment';
import constants from '../utils/constants';
import apiConstants from '../utils/apiConstants';
import request from '../utils/request';

const getFiltersWithShipDateBackendFormat = (filters) => {
  const filtersUpdated = Object.assign({}, filters);
  filtersUpdated.shipDate = filters.shipDate || new Date();
  filtersUpdated.shipDate = moment(filtersUpdated.shipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
  return filtersUpdated;
};

const extensionService = {
  search(filters) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS,
      method: 'get',
      params: filtersUpdated
    });
  }
};

export default extensionService;
