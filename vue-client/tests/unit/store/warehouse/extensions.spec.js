import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import extensions from '@/store/modules/warehouse/extensions';
import extensionApiService from '@/api/extensionService';
import store from '@/store';

describe('@state/modules/warehouse/extensions', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store.commit('extensions/CLEAR_SELECTED_BY_CONSIGNEE');
  });

  const consigneeAccountName = 'Consignee Test';
  const actionUpdateSelectedConsolidate = 'extensions/updateSelectedConsolidate';
  const actionUpdateSelecteUnit = 'extensions/updateSelecteUnit';

  it('exports a valid Vuex module', () => {
    expect(extensions).toBeAVuexModule();
  });

  it('calls actions[extensions/updateSelectedConsolidate] normal flow', async () => {
    // Given This configuration:
    const consigneeAccountId = 12929929;
    const consolidateSelected1 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 122, consolidateTotal: 50
    };
    const consolidateSelected2 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 123, consolidateTotal: 12
    };
    const consolidateSelected3 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 124, consolidateTotal: 44
    };

    const selectedByConsigneeObjectExpected = {};
    selectedByConsigneeObjectExpected[consigneeAccountId.toString()] = {
      consigneeAccountName,
      totalUnits: consolidateSelected2.consolidateTotal + consolidateSelected3.consolidateTotal,
      consolidations: [
        {
          id: consolidateSelected2.consolidateId, total: consolidateSelected2.consolidateTotal, totalChecked: consolidateSelected2.consolidateTotal, units: [], allDetailsCheckedInitially: true
        },
        {
          id: consolidateSelected3.consolidateId, total: consolidateSelected3.consolidateTotal, totalChecked: consolidateSelected3.consolidateTotal, units: [], allDetailsCheckedInitially: true
        },
      ]
    };

    // When we select 1, next select 2, next deselect 1, and finally select 3, the selectedByConsignee must be the selectedByConsigneeObjectExpected:
    // Select 1
    await store.dispatch(actionUpdateSelectedConsolidate, consolidateSelected1);
    // Select 2
    await store.dispatch(actionUpdateSelectedConsolidate, consolidateSelected2);
    // Deselect 1
    await store.dispatch(actionUpdateSelectedConsolidate, consolidateSelected1);
    // Select 3
    await store.dispatch(actionUpdateSelectedConsolidate, consolidateSelected3);

    // Then:
    expect(store.state.extensions.selectedByConsignee).toEqual(selectedByConsigneeObjectExpected);
  });

  it('calls actions[extensions/updateSelecteUnit] normal flow', async () => {
    // Given This configuration:
    const consigneeAccountId = 12929929;
    const unitConsolidationSelected1 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 122, consolidateTotal: 50, unitId: 4001
    };
    const unitConsolidationSelected2 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 122, consolidateTotal: 50, unitId: 4002
    };

    const unitConsolidationSelected3 = {
      consigneeAccountId, consigneeAccountName, consolidateId: 123, consolidateTotal: 250, unitId: 5004
    };

    const selectedByConsigneeObjectExpected = {};
    selectedByConsigneeObjectExpected[consigneeAccountId.toString()] = {
      consigneeAccountName,
      totalUnits: 2,
      consolidations: [
        {
          id: unitConsolidationSelected2.consolidateId, total: unitConsolidationSelected2.consolidateTotal, totalChecked: 1, units: [4002], allDetailsCheckedInitially: false
        },
        {
          id: unitConsolidationSelected3.consolidateId, total: unitConsolidationSelected3.consolidateTotal, totalChecked: 1, units: [5004], allDetailsCheckedInitially: false
        }
      ]
    };

    // When we select unit 4001, next select 4002, next deselect 4001, and select 5004, the selectedByConsignee must be the selectedByConsigneeObjectExpected:
    // Select 4001
    await store.dispatch(actionUpdateSelecteUnit, unitConsolidationSelected1);
    // Select 4002
    await store.dispatch(actionUpdateSelecteUnit, unitConsolidationSelected2);
    // Deselect 4001
    await store.dispatch(actionUpdateSelecteUnit, unitConsolidationSelected1);
    // Deselect 5004
    await store.dispatch(actionUpdateSelecteUnit, unitConsolidationSelected3);

    // Then:
    expect(store.state.extensions.selectedByConsignee).toEqual(selectedByConsigneeObjectExpected);
  });

  it('calls actions[extensions/updateUnitsAfterLoadDetail] normal flow', async () => {
    // Given This configuration:
    const consigneeAccountId = 12929929;
    const consolidateSelected = {
      consigneeAccountId, consigneeAccountName, consolidateId: 200, consolidateTotal: 7
    };
    const unitsInfo = {
      consigneeAccountId, consolidateId: consolidateSelected.consolidateId, unitIds: [4001, 4002, 4003, 4004, 4005, 4006, 4007]
    };

    const selectedByConsigneeObjectExpected = {};
    selectedByConsigneeObjectExpected[consigneeAccountId.toString()] = {
      consigneeAccountName,
      totalUnits: consolidateSelected.consolidateTotal,
      consolidations: [
        {
          id: consolidateSelected.consolidateId, total: consolidateSelected.consolidateTotal, totalChecked: consolidateSelected.consolidateTotal, units: [4001, 4002, 4003, 4004, 4005, 4006, 4007], allDetailsCheckedInitially: false
        }
      ]
    };

    // When we select consolidation first time, next call the updateUnitsAfterLoadDetail
    // Select 1
    await store.dispatch(actionUpdateSelectedConsolidate, consolidateSelected);
    // call updateUnitsAfterLoadDetail
    await store.dispatch('extensions/updateUnitsAfterLoadDetail', unitsInfo);

    // Then:
    expect(store.state.extensions.selectedByConsignee).toEqual(selectedByConsigneeObjectExpected);
  });

  it('calls actions[extensions/submit] normal flow', async () => {
    // Given: The following config
    const selectedByConsignee = {
      201: {
        consigneeAccountName: 'Consignee Test 1',
        totalUnits: 20,
        consolidations: [
          {
            id: 11, total: 12, totalChecked: 12, units: []
          },
          {
            id: 12, total: 8, totalChecked: 8, units: []
          },
        ]
      },
      202: {
        consigneeAccountName: 'Consignee Test 2',
        totalUnits: 97,
        consolidations: [
          {
            id: 13, total: 40, totalChecked: 40, units: []
          },
          {
            id: 14, total: 57, totalChecked: 57, units: []
          },
        ]
      }
    };
    store.commit('extensions/UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    const extensionHeader = {
      shipDate: new Date(),
      shippingHour: '22:00',
      applicantName: 'Shipper Test user',
      contactNumber: '(309) 288817-22'
    };
    const extensionToSaveExpectedObject = Object.assign({}, extensionHeader);
    extensionToSaveExpectedObject.consolidateList = [selectedByConsignee['201'].consolidations[0], selectedByConsignee['201'].consolidations[1], selectedByConsignee['202'].consolidations[0], selectedByConsignee['202'].consolidations[1]];
    extensionApiService.submit = jest.fn().mockImplementation(() => Promise.resolve({ message: 'Ok' }));

    // When we call the action extensions/submit
    await store.dispatch('extensions/submit', extensionHeader);

    // then: extensionApiService.submit its called and selectedByConsignee is cleared and
    expect(extensionApiService.submit).toHaveBeenCalledWith(extensionToSaveExpectedObject);
    expect(store.state.extensions.selectedByConsignee).toEqual({});
  });
});
