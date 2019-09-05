import request from '@/utils/request';
import constants from '@/utils/constants';

const autocompleteService = {
  getList(url, searchString, shipperAccountId) {
    const requestConfig = {
      url,
      method: 'get',
      params: {
        search: searchString,
        maxResults: constants.API.AUTOCOMPLETE.LIMIT
      }
    };

    if (shipperAccountId) {
      requestConfig.params.shipperAccountId = shipperAccountId;
    }

    return request(requestConfig);
  }
};
export default autocompleteService;
