import fileSaver from 'file-saver';
import moment from 'moment';
import request from '../utils/request';
import apiConstants from '../utils/apiConstants';
import constants from '../utils/constants';

const suggestedFileNameHeader = 'suggested-file-name';
const typeApplicationPdfHeader = 'application/pdf';
/*
 Helper method to put correct format in field shipDate for the actions that requires the page filters.
*/
const getFiltersWithShipDateBackendFormat = (filters) => {
  const filtersUpdated = Object.assign({}, filters);
  filtersUpdated.shipDate = filters.shipDate || new Date();
  filtersUpdated.shipDate = moment(filtersUpdated.shipDate.getTime()).format(constants.DATES.DEFAULT_BACKEND_FORMAT);
  return filtersUpdated;
};

const saveFileBlob = (response) => {
  fileSaver.saveAs(response.data, response.headers[suggestedFileNameHeader]);
  const file = new Blob([response.data], { type: typeApplicationPdfHeader });
  const url = URL.createObjectURL(file);
  window.open(url);
};

const orderService = {
  save(orderToSave) {
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS,
      method: 'post',
      data: orderToSave
    });
  },
  update(unitsConsolidateId, orderToUpdate) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS}/${unitsConsolidateId}`,
      method: 'put',
      data: orderToUpdate
    });
  },
  search(filters) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS,
      method: 'get',
      params: filtersUpdated
    });
  },
  finalizeShipments(filters) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.FINALIZE,
      method: 'put',
      data: filtersUpdated
    });
  },
  changeShipDate(filters, newShipDate) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.CHANGE_SHIP_DATE,
      method: 'put',
      data: filtersUpdated,
      params: { newShipDate }
    });
  },
  deleteShipments(unitsConsolidateId) {
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS,
      method: 'delete',
      params: { unitsConsolidateId }
    });
  },
  getCutoffLimitDate(shipperAccountId, shipDate) {
    return request({
      url: apiConstants.END_POINTS.ORDER_ENTRY.CUTOFF,
      method: 'get',
      params: { shipperAccountId, shipDate }
    });
  },
  getSettings(shipperAccountNumber) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.SETTINGS}/${shipperAccountNumber}`,
      method: 'get'
    });
  },
  findUnits(filters) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.SHIPMENTS}/${filters.unitsConsolidateId}`,
      method: 'get',
      params: filters
    });
  },
  deleteUnit(unitId) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.DELETE_UNIT}/${unitId}`,
      method: 'delete'
    });
  },
  printUnit(unitId) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.PRINT_UNIT}/${unitId}`,
      method: 'get',
      responseType: 'blob'
    }).then(saveFileBlob);
  },
  printUnitsConsolidate(unitsConsolidateId) {
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.PRINT_UNIT_CONSOLIDTAE}/${unitsConsolidateId}`,
      method: 'get',
      responseType: 'blob'
    }).then(saveFileBlob);
  },
  printLabelsMassive(filters) {
    const filtersUpdated = getFiltersWithShipDateBackendFormat(filters);
    return request({
      url: `${apiConstants.END_POINTS.ORDER_ENTRY.PRINT_UNIT_CONSOLIDTAE}`,
      method: 'get',
      responseType: 'blob',
      params: filtersUpdated
    }).then(saveFileBlob);
  },
  getTerminalData() {
    return request({
      url: `${apiConstants.END_POINTS.EXTENSION_REQUEST.TERMINAL_CODES}`,
      method: 'get'
    });
  }
};

export default orderService;
