<template>
<span>
  <shipper-list :action-str-select-chained="actionSelectChained" />
  <div class="app-view-container">
    <div class="app-view-title">{{ $t('warehouse.orderEntry.title') }} </div>
    <el-row :gutter="20" type="flex" align="stretch">
      <search-filters />
      <countdown-cutoff />
    </el-row>
    <el-row :gutter="20" type="flex" align="stretch">
      <el-col :span="24" >
        <div class="order-table-container bg-white" v-if="!orderEntry.isCreatingExtension">
          <div class="default-section-header">
            <div class="default-section-title"> {{ $t('warehouse.orderEntry.orderSummary') }} </div>
            <div class="default-section-actions">
              <el-button id="btn-extension-request" class="button-extension-request" type="success" plain @click="extensionRequest" size="mini" v-if="showExtensionRequestButton()">{{ $t('warehouse.orderEntry.extensions.extensionRequest') }}</el-button>
              <finalize-shipments-button />
              <add-dialog-button />
              <el-dropdown id="more-actions-dropdown" v-show="hasOrderConsolidations">
                <el-button class="button-more-actions" type="success" plain size="mini">{{ $t('common.moreActions') }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><change-ship-date-button ref="change" /></el-dropdown-item>
                  <el-dropdown-item><print-massive-button ref="massive" /></el-dropdown-item>
                  <el-dropdown-item><print-shipping-manifest ref="manifest" /></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="order-table">
            <table-summary />
          </div>
        </div>
        <div v-else>
          <table-summary-extensions />
        </div>
      </el-col>
    </el-row>
  </div>
</span>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import ShipperList from '@/components/ShipperList';
import AddDialogButton from './components/AddDialog';
import FinalizeShipmentsButton from './components/FinalizeShipmentsButton';
import SearchFilters from './SearchFilters';
import CountdownCutoff from './CountdownCutoff';
import TableSummary from './TableSummary';
import TableSummaryExtensions from './TableSummaryExtensions';
import ChangeShipDateButton from './components/ChangeShipDateButton';
import PrintMassiveButton from './components/PrintMassiveButton';
import constants from '@/utils/constants';
import PrintShippingManifest from './components/PrintShippingManifest';

export default {
  name: 'orderEntry',
  components: {
    AddDialogButton,
    FinalizeShipmentsButton,
    SearchFilters,
    TableSummary,
    TableSummaryExtensions,
    CountdownCutoff,
    ChangeShipDateButton,
    PrintMassiveButton,
    ShipperList,
    PrintShippingManifest
  },
  computed: {
    ...mapGetters([
      'orderEntry',
      'hasOrderConsolidations'
    ])
  },
  data() {
    return {
      actionSelectChained: ['orderEntry/getSettings', 'orderEntry/search', 'orderEntry/getCutoffLimitDate']
    };
  },
  methods: {
    extensionRequest() {
      this.$store.dispatch('orderEntry/setIsCreatingExtension', true);
    },
    showExtensionRequestButton() {
      // If shipdate is today and cutoffHourForToday is not null then show button.
      return this.hasOrderConsolidations && this.orderEntry.settings.cutoffHourForToday && this.orderEntry.actualFilters.shipDate
              && moment(this.orderEntry.actualFilters.shipDate).format(constants.DATES.DEFAULT_DISPLAY_FORMAT) === moment().format(constants.DATES.DEFAULT_DISPLAY_FORMAT);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.order-table-container {
  margin-top: 20px;
  position: relative;
  .order-table {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.button-extension-request {
  margin-right: 10px;
}

.button-more-actions  {
  margin-left: 10px;
}
</style>
