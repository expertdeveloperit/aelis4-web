import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import accountApiService from '@/api/accountService';
import store from '@/store';

describe('@store/modules/warehouse/account', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('orderEntry In a store Actions', () => {
    it(' calls actions[account/addConsigneeShipperRelation]  successfully', async () => {
      const responseApiAddConsigneeShipperRelation = { message: 'OK' };
      const shipperAccountId = 6717;
      const consigneeAccountId = 38999;
      accountApiService.addConsigneeShipperRelation = jest.fn().mockImplementation(() => Promise.resolve(responseApiAddConsigneeShipperRelation));
      const response = await store.dispatch('account/addConsigneeShipperRelation', { shipperAccountId, consigneeAccountId });
      expect(response).toEqual(responseApiAddConsigneeShipperRelation);
    });

    it(' calls actions[account/addConsigneeShipperRelation] error reject', async () => {
      const responseApiAddConsigneeShipperRelation = { message: 'OK' };
      const shipperAccountId = 6717;
      const consigneeAccountId = 38999;
      accountApiService.addConsigneeShipperRelation = jest.fn().mockImplementation(() => Promise.reject(responseApiAddConsigneeShipperRelation));
      await store.dispatch('account/addConsigneeShipperRelation', { shipperAccountId, consigneeAccountId }).catch(
        (error) => {
          expect(error).toEqual(responseApiAddConsigneeShipperRelation);
        }
      );
    });

    it(' calls actions[account/getShipperListScroll] successfully', async () => {
      store.dispatch('account/resetShipperList');
      const responseShippers = {
        totalRows: 938,
        data: [{ id: 6319, name: 'ALLSTAR ORCHIDS & FLOWERS', number: 'M023050' },
          { id: 7217, name: 'ALLURE FARMS INC.', number: 'M200459' },
          { id: 4823, name: 'ALPHA FERN    ', number: 'E009140' },
          { id: 6776, name: 'ALPINE FRESH INC', number: 'M400077' },
          { id: 5812, name: 'ALPINE FRESH INC - BILL TO', number: 'M010050' },
          { id: 4062, name: 'AMC FLORAL INTERNATIONAL', number: 'M002882' },
          { id: 7616, name: 'AMERICAN BUSINESS LOGISTICS', number: 'M000605' },
          { id: 7466, name: 'AMERICAN FLORAL CARGO CORP', number: 'M000810' },
          { id: 6860, name: 'AMERICAN LOGISTICS & CONSOL (ACL)', number: 'M400047' }]
      };
      const search = 'A000012';
      const filters = {
        page: 2,
        rows: 10,
        search,
        pageResults: true
      };
      accountApiService.getShippers = jest.fn().mockImplementation(() => Promise.resolve(responseShippers));
      const response = await store.dispatch('account/getShipperListScroll', search);
      expect(accountApiService.getShippers).toHaveBeenCalledWith(filters);
      console.log(response);
    });
  });
});
