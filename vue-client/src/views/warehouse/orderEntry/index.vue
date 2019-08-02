<template>
  <span>
    <shipper-list :action-str-select-chained="actionSelectChained" />
    <div class="app-view-container">
      <div class="app-view-title">{{ $t('warehouse.orderEntry.title') }}</div>
      <el-row :gutter="20" type="flex" align="stretch">
        <search-filters />
        <countdown-cutoff />
      </el-row>
      <el-row :gutter="20" type="flex" align="stretch">
        <el-col :span="24">
          <div class="order-table-container bg-white">
            <div class="default-section-header">
              <div class="default-section-title">{{ $t('warehouse.orderEntry.orderSummary') }}</div>
              <div class="default-section-actions">
                <print-massive-button />
                <change-ship-date-button />
                <finalize-shipments-button />
                <add-dialog-button />
              </div>
            </div>
            <div class="order-table">
              <table-summary />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </span>
</template>

<script>
import ShipperList from '@/components/ShipperList';
import AddDialogButton from './components/AddDialog';
import FinalizeShipmentsButton from './components/FinalizeShipmentsButton';
import SearchFilters from './SearchFilters';
import CountdownCutoff from './CountdownCutoff';
import TableSummary from './TableSummary';
import ChangeShipDateButton from './components/ChangeShipDateButton';
import PrintMassiveButton from './components/PrintMassiveButton';

export default {
  name: 'orderEntry',
  components: {
    AddDialogButton,
    FinalizeShipmentsButton,
    SearchFilters,
    TableSummary,
    CountdownCutoff,
    ChangeShipDateButton,
    PrintMassiveButton,
    ShipperList
  },
  data() {
    return {
      actionSelectChained: ['orderEntry/getSettings', 'orderEntry/search', 'orderEntry/getCutoffLimitDate']
    };
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
</style>
