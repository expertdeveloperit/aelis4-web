import { Loading, Message } from 'element-ui';
import extensionApiService from '@/api/extensionService';
import constants from '@/utils/constants';


const newConsolidation = consolidationSelected => ({
  id: consolidationSelected.consolidateId,
  total: consolidationSelected.consolidateTotal,
  totalChecked: consolidationSelected.consolidateTotal,
  allDetailsCheckedInitially: true, // This fields indicates that the detail search must be returns all ids to add into units array below.
  units: []
});
const newUnitConsolidation = unitConsolidationSelected => ({
  id: unitConsolidationSelected.consolidateId,
  total: unitConsolidationSelected.consolidateTotal,
  totalChecked: 1,
  allDetailsCheckedInitially: false,
  units: [unitConsolidationSelected.unitId]
});

const extensions = {
  namespaced: true,
  state: {
    /* selectedByConsignee E.g.:
    {
        '${consigneeAccountId}':  {
            consigneeAccountName: 'ARMELLINI PALM CITY DOCK - M200044',
            totalUnits: 423,
            consolidations: [
            { id: 1888727829, total: 10, totalChecked: 10, units: [] },
            { id: 1888727830, total: 413, totalChecked: 413, units: [] },
            ]
        },
    }
    */
    selectedByConsignee: {}
  },
  mutations: {
    UPDATE_SELECTED_BY_CONSIGNEE: (state, selectedByConsignee) => {
      state.selectedByConsignee = selectedByConsignee;
    },
    CLEAR_SELECTED_BY_CONSIGNEE: (state) => {
      state.selectedByConsignee = {};
    }
  },
  actions: {
    /**
    Action to update consolidate selected from extensions summary, check(Add to consolidations array)
    and uncheck(Remove from consolidations array).
    The consolidationSelected must be have the following attributes.
     E.g.:
        consolidationSelected : {
            consigneeAccountId,
            consigneeAccountName,
            consolidateId,
            consolidateTotal
        }
    * */
    updateSelectedConsolidate({ commit, state }, consolidationSelected) {
      const selectedByConsignee = { ...state.selectedByConsignee };

      // 1. If the consignee object exists then we update the consolidation list.
      if (Object.prototype.hasOwnProperty.call(selectedByConsignee, consolidationSelected.consigneeAccountId)) {
        const consolidationSelectedExists = selectedByConsignee[consolidationSelected.consigneeAccountId].consolidations.find(c => c.id === consolidationSelected.consolidateId);

        // 1.1 If consolidation exists then we must delete the consolidate and decrease totals.
        if (consolidationSelectedExists) {
          selectedByConsignee[consolidationSelected.consigneeAccountId].totalUnits = Math.max(0, selectedByConsignee[consolidationSelected.consigneeAccountId].totalUnits - consolidationSelectedExists.totalChecked);
          selectedByConsignee[consolidationSelected.consigneeAccountId].consolidations = selectedByConsignee[consolidationSelected.consigneeAccountId].consolidations.filter(c => c.id !== consolidationSelected.consolidateId);
          if (selectedByConsignee[consolidationSelected.consigneeAccountId].consolidations.length === 0) {
            delete selectedByConsignee[consolidationSelected.consigneeAccountId];
          }
        } else {
        // 1.2 If consolidation does not exists then we must add the consolidate and increase totals.
          selectedByConsignee[consolidationSelected.consigneeAccountId].totalUnits += consolidationSelected.consolidateTotal;
          selectedByConsignee[consolidationSelected.consigneeAccountId].consolidations.push(newConsolidation(consolidationSelected));
        }
      } else {
      // 2. If the consignee object does not exists then we  create the consignee object and add the consolidate
        selectedByConsignee[consolidationSelected.consigneeAccountId] = {
          consigneeAccountName: consolidationSelected.consigneeAccountName,
          totalUnits: consolidationSelected.consolidateTotal,
          consolidations: [
            newConsolidation(consolidationSelected)
          ]
        };
      }
      commit('UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    },
    /**
    Action to update units from consolidation when  detail is loaded and the flag allDetailsCheckedInitially is true.
    The unitsInfo must be have the following attributes.
     E.g.:
        unitsInfo : {
          consigneeAccountId,
          consolidateId,
          unitIds
        }
    * */
    updateUnitsAfterLoadDetail({ commit, state }, unitsInfo) {
      const selectedByConsignee = { ...state.selectedByConsignee };

      // 1. If the consignee object exists then we update the consolidation list.
      if (Object.prototype.hasOwnProperty.call(selectedByConsignee, unitsInfo.consigneeAccountId)) {
        const consolidationSelectedExists = selectedByConsignee[unitsInfo.consigneeAccountId].consolidations.find(c => c.id === unitsInfo.consolidateId);

        // 2. If consolidation exists then we must update units without modify totals.
        if (consolidationSelectedExists) {
          consolidationSelectedExists.units = unitsInfo.unitIds;
          // Update flag To control the load only first time.
          consolidationSelectedExists.allDetailsCheckedInitially = false;
          commit('UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
        }
      }
    },
    /**
    Action to update consolidate selected from extensions detail, check(Add to units array)
    and uncheck(Remove from units array).
    The consolidationSelected must be have the following attributes.
     E.g.:
        unitConsolidationSelected : {
            consigneeAccountId,
            consigneeAccountName,
            consolidateId,
            consolidateTotal,
            unitId
        }
    * */
    updateSelecteUnit({ commit, state }, unitConsolidationSelected) {
      const selectedByConsignee = { ...state.selectedByConsignee };

      // 1. If the consignee object exists then we update the consolidation list.
      if (Object.prototype.hasOwnProperty.call(selectedByConsignee, unitConsolidationSelected.consigneeAccountId)) {
        const consolidationSelectedExists = selectedByConsignee[unitConsolidationSelected.consigneeAccountId].consolidations.find(c => c.id === unitConsolidationSelected.consolidateId);

        if (consolidationSelectedExists) {
          const unitIdExitsIndex = consolidationSelectedExists.units.indexOf(unitConsolidationSelected.unitId);
          // 1.1.1 If does not exist unit Id, then we add them.
          if (unitIdExitsIndex < 0) {
            selectedByConsignee[unitConsolidationSelected.consigneeAccountId].totalUnits += 1;
            consolidationSelectedExists.totalChecked += 1;
            consolidationSelectedExists.units.push(unitConsolidationSelected.unitId);
          } else {
            // 1.1.2 If exists unit Id, then we remove them.
            selectedByConsignee[unitConsolidationSelected.consigneeAccountId].totalUnits -= 1;
            consolidationSelectedExists.totalChecked -= 1;
            consolidationSelectedExists.units.splice(unitIdExitsIndex, 1);

            // 1.1.3 If totalchecked is zero, then also remove consolidationSelected.
            if (consolidationSelectedExists.totalChecked <= 0) {
              selectedByConsignee[unitConsolidationSelected.consigneeAccountId].consolidations = selectedByConsignee[unitConsolidationSelected.consigneeAccountId].consolidations.filter(c => c.id !== unitConsolidationSelected.consolidateId);
            }
          }
        } else {
        // 1.2 If consolidation does not exists then we must add the consolidate and increase totals.
          selectedByConsignee[unitConsolidationSelected.consigneeAccountId].totalUnits += 1;
          selectedByConsignee[unitConsolidationSelected.consigneeAccountId].consolidations.push(newUnitConsolidation(unitConsolidationSelected));
        }
      } else {
      // 2. If the consignee object does not exists then we  create the consignee object and add the consolidate
        selectedByConsignee[unitConsolidationSelected.consigneeAccountId] = {
          consigneeAccountName: unitConsolidationSelected.consigneeAccountName,
          totalUnits: 1,
          consolidations: [
            newUnitConsolidation(unitConsolidationSelected)
          ]
        };
      }
      commit('UPDATE_SELECTED_BY_CONSIGNEE', selectedByConsignee);
    },
    async submit({ commit, state }, extensionHeader) {
      const extensionToSave = Object.assign({}, extensionHeader);
      extensionToSave.consolidateList = [];
      for (const consigneeAccountId in state.selectedByConsignee) {
        if (Object.prototype.hasOwnProperty.call(state.selectedByConsignee, consigneeAccountId)) {
          for (const consolidation of state.selectedByConsignee[consigneeAccountId].consolidations) {
            extensionToSave.consolidateList.push(consolidation);
          }
        }
      }
      Message.closeAll();
      const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
      const response = await extensionApiService.submit(extensionToSave);
      commit('CLEAR_SELECTED_BY_CONSIGNEE');
      loading.close();
      return response;
    },
    clearSelectedByConsignee({ commit }) {
      commit('CLEAR_SELECTED_BY_CONSIGNEE');
    }
  }
};

export default extensions;
