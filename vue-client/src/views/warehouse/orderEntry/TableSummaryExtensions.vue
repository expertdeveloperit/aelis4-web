<template>
    <div class="order-table-container order-extensions-container bg-white">
        <div class="default-section-header">
          <div class="default-section-title"> {{ $t('warehouse.orderEntry.extensions.titleSummary') }} </div>
          <div class="default-section-actions">
              <el-button type="default" size="mini" @click="cancelExtension()"> {{ $t('common.cancel') }} </el-button>
              <submit-extension-button />
          </div>
        </div>
        <div class="order-table">
            <div class="height-100-p">
                <el-table
                    :data="orderEntry.list"
                    v-loading="orderEntry.loadingSearch"
                    id="order-data-list"
                    size="mini"
                    tooltip-effect="dark"
                    sortable
                    class="dark-blue-table"
                    :empty-text="$t('common.notAbleToFindRecords')"
                    @sort-change="handleSortChange"
                    stripe>
                    <el-table-column
                        prop="orderNumber"
                        sortable="custom"
                        :min-width="15"
                        align="center"
                        :label="$t('warehouse.orderEntry.orderNumberShort')">
                        <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
                            <span> {{ scope.row.orderNumber }} </span>
                        </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="consignee"
                        sortable="custom"
                        :min-width="30"
                        :label="$t('warehouse.orderEntry.consignee')">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="`${scope.row.consigneeName} - ${ scope.row.consigneeAccount }`" placement="top">
                            <span> {{ scope.row.consigneeName }} - {{ scope.row.consigneeAccount }}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :min-width="10"
                        prop="unitOfMeasureName"
                        :label="$t('warehouse.orderEntry.unitOfMeasureShort')">
                    </el-table-column>
                    <el-table-column
                        :min-width="8"
                        prop="numberUnits"
                        :label="$t('warehouse.orderEntry.numberOfUnitsShort')">
                    </el-table-column>
                    <el-table-column
                        :min-width="10"
                        prop="measure"
                        :label="$t('warehouse.orderEntry.measure')">
                    </el-table-column>
                    <el-table-column
                        prop="length"
                        :min-width="8"
                        :label="$t('warehouse.orderEntry.length')">
                    </el-table-column>
                    <el-table-column
                        prop="width"
                        :min-width="8"
                        :label="$t('warehouse.orderEntry.width')">
                    </el-table-column>
                    <el-table-column
                        prop="height"
                        :min-width="8"
                        :label="$t('warehouse.orderEntry.height')">
                    </el-table-column>
                    <el-table-column
                        :min-width="10"
                        prop="productCode"
                        :label="$t('warehouse.orderEntry.product')">
                    </el-table-column>
                    <el-table-column
                        prop="productDescription"
                        sortable="custom"
                        :min-width="23"
                        :label="$t('warehouse.orderEntry.productDescription')">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.productDescription" placement="top">
                            <span> {{ scope.row.productDescription }} </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :min-width="8"
                        prop="poNumber"
                        :label="$t('warehouse.orderEntry.poNumber')">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.poNumber" placement="top">
                            <span> {{ scope.row.poNumber }} </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :min-width="15"
                        prop="farmName"
                        :label="$t('warehouse.orderEntry.farmBroker')">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.farmName" placement="top">
                            <span> {{ scope.row.farmName }} </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        :min-width="9"
                        prop="status"
                        :label="$t('warehouse.orderEntry.finalized')">
                        <template slot-scope="scope">
                        <span class="icon-status-span">
                            <i v-if="scope.row.status === finalizedId" class="el-icon-success green-success"></i>
                        </span>
                        <span class="icon-status-span">
                          <el-tooltip v-if="scope.row.lastExtensionNumber" class="item" effect="dark" :content="`${extensionStatus[scope.row.lastExtensionStatus].name} - ${scope.row.lastExtensionNumber}`" placement="top-start">
                              <i class="far fa-clock"  :class="extensionStatus[scope.row.lastExtensionStatus].colorCssClass"></i>
                          </el-tooltip>
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :min-width="15" :label="$t('warehouse.orderEntry.extensions.requestExtension')" align="center" class-name="fixed-width">
                    <template slot-scope="scope">
                        <span v-if="showCheckbox(scope.row.status, scope.row.numberUnits, scope.row.numberUnitsReceived, scope.row.lastExtensionStatus)">
                            <el-checkbox :value="isCheckedExtension(scope.row.consigneeAccountId, scope.row.id)" :indeterminate="isIndeterminate(scope.row.consigneeAccountId, scope.row.id)" @change="handleUpdateSelectedConsolidate(scope.row)" label="" class="green-indeterminate-checkbox"></el-checkbox>
                        </span>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-show="orderEntry.total > 0"
                @size-change="handleSearchChangeLimit"
                :page-sizes="sizes"
                :page-size="orderEntry.actualFilters.rows"
                :current-page.sync="orderEntry.actualFilters.page"
                @current-change="handleSearchChangePage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="orderEntry.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import SubmitExtensionButton from '@/views/warehouse/orderEntry/components/extensions/SubmitExtensionButton';

export default {
  name: 'TableSummary',
  components: { SubmitExtensionButton },
  computed: {
    ...mapGetters([
      'orderEntry',
      'extensions'
    ])
  },
  data() {
    return {
      sizes: constants.TABLES.DEFAULT_LIMIT_SIZES,
      finalizedId: constants.ORDER_ENTRY.ORDER_STATUS[2].value,
      extensionStatus: constants.ORDER_ENTRY.EXTENSION_STATUS,
      extensionStatusRejected: constants.ORDER_ENTRY.EXTENSION_STATUS[2].index
    };
  },
  methods: {
    handleSearchChangePage(val) {
      this.$store.dispatch('orderEntry/search', { page: val });
    },
    handleSearchChangeLimit(val) {
      this.$store.dispatch('orderEntry/search', { rows: val, page: constants.TABLES.DEFAULT_PAGE });
    },
    handleSortChange(data) {
      let { prop } = data;
      const { order } = data;
      prop = constants.TABLES.ORDER_ENTRY.COLUMNS_MAP_SORT[prop] || prop;
      this.$store.dispatch('orderEntry/search', { orderField: prop, orderDirection: constants.TABLES.ORDER_DIRECTION[order] });
    },
    showCheckbox(status, numberUnits, numberUnitsReceived, lastExtensionStatus) {
      // Only Show Checkbox when status is finalized, the consolidation has units pending to receive.
      // And This one does not have an extension, or if you have the status rejected (This check will not appear if you have an extension pending or approved).
      const isStatusFinalized = status === this.finalizedId;
      const hasUnitsPendingToReceive = numberUnits > numberUnitsReceived;
      const noExtensionOrExtensionRejected = (lastExtensionStatus === null || lastExtensionStatus === undefined) || lastExtensionStatus === this.extensionStatusRejected;
      return isStatusFinalized && hasUnitsPendingToReceive && noExtensionOrExtensionRejected;
    },
    isCheckedExtension(consigneeAccountId, consolidationId) {
      if (Object.prototype.hasOwnProperty.call(this.extensions.selectedByConsignee, consigneeAccountId)) {
        const consolidationSelectedExists = this.extensions.selectedByConsignee[consigneeAccountId].consolidations.find(c => c.id === consolidationId);
        if (consolidationSelectedExists && consolidationSelectedExists.total === consolidationSelectedExists.totalChecked) {
          return true;
        }
        return false;
      }
      return false;
    },
    isIndeterminate(consigneeAccountId, consolidationId) {
      if (Object.prototype.hasOwnProperty.call(this.extensions.selectedByConsignee, consigneeAccountId)) {
        const consolidationSelectedExists = this.extensions.selectedByConsignee[consigneeAccountId].consolidations.find(c => c.id === consolidationId);
        if (consolidationSelectedExists && consolidationSelectedExists.total !== consolidationSelectedExists.totalChecked) {
          return true;
        }
        return false;
      }
      return false;
    },
    handleUpdateSelectedConsolidate(consolidation) {
      const consolidationSelected = {
        consigneeAccountId: consolidation.consigneeAccountId,
        consigneeAccountName: consolidation.consigneeName,
        consolidateId: consolidation.id,
        consolidateTotal: consolidation.numberUnits - consolidation.numberUnitsReceived
      };
      this.$store.dispatch('extensions/updateSelectedConsolidate', consolidationSelected);
    },
    async cancelExtension() {
      const confirmCancelExtension = await this.$confirm(this.$t('warehouse.orderEntry.extensions.confirmCancel'), { confirmButtonText: this.$t('common.yes') }).catch(() => {});
      if (confirmCancelExtension) {
        this.$store.dispatch('extensions/clearSelectedByConsignee');
        this.$store.dispatch('orderEntry/setFilterShipDateDisabled', false);
        this.$store.dispatch('orderEntry/setIsCreatingExtension', false);
      }
    }
  },
  mounted() {
    this.$store.dispatch('orderEntry/setFilterShipDateDisabled', true);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.order-extensions-container {
    box-shadow: 0px 0px 7px 4px #dfdede;
    .icon-details-extensions {
      margin-left: 10px;
      i {
        font-size: 15px !important;
      }
    }
}

</style>
