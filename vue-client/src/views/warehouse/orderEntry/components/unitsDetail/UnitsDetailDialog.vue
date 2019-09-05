<template>
<span>
    <i class="el-icon-search header-info-dialog-value icon-action" id="btn-units-detail" @click="handleOpenDialog" size="mini" icon="el-icon-plus"></i>
    <el-dialog
    :close-on-click-modal="false"
    :title="orderEntry.isCreatingExtension ? $t('warehouse.orderEntry.extensions.selectDetails') : $t('warehouse.orderEntry.unitsDetailTitle')"
    :visible.sync="dialogVisible"
    width="77%"
    :before-close="handleClose">
    <el-col :span="4">
      <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.orderNumber') }}</label>
    </el-col>
    <el-col :span="4">
      <span class="span-small-list "> {{ orderEntry.headerUnitList.orderNumber }} </span>
    </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.shipDate') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.shipDate | moment("MM/DD/YYYY") }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.consignee') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.consigneeName }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.height') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.height }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.length') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.length }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.width') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.width }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.productLong') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.productCode }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.productDescription') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.productDescription }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.numberOfUnits') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.numberUnits }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.unitOfMeasure') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.unitOfMeasureName }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.measure') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.measure }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.poNumber') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list"> {{ orderEntry.headerUnitList.poNumber }} </span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.status') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list">{{ $t('warehouse.orderEntry.finalized') }}</span>
      </el-col>
      <el-col :span="4">
        <label class="margin-bottom-small-list">{{ $t('warehouse.orderEntry.farmBroker') }}</label>
      </el-col>
      <el-col :span="4">
        <span class="span-small-list">{{ orderEntry.headerUnitList.farmName }}</span>
      </el-col>
      <div>
        <span class="title-list">{{ $t('warehouse.orderEntry.units') }}</span>
        <div>
          <el-col :span="3" class="search-unitid-div">
            <label class="margin-bottom-small-list label-search-unitid">{{ $t('warehouse.orderEntry.findUnit') }}</label>
          </el-col>
          <el-col :span="4">
            <div>
              <el-input
                v-model="search"
                v-alphanumeric-validation
                maxlength="50"
                clearable
                @change="handleSearchUnit"
                class="inline-input"
                size="mini"
                suffix-icon="el-icon-search"
                id="search-unitid"
                ref="search-unitid"
                ></el-input>
            </div>
          </el-col>
          <el-button id="btn-ok-dialog-extensions-top" class="btn-ok-dialog-extensions" type="primary" size="mini" @click="dialogVisible = false" v-if="orderEntry.isCreatingExtension"> {{ $t('common.ok') }}</el-button>
        </div>
      </div>
        <el-table
          stripe
          v-loading="orderEntry.loadingSearch"
          id="units-data-list"
          size="mini"
          tooltip-effect="dark"
          sortable
          width="80%"
          class="dark-blue-table"
          :empty-text="$t('common.notAbleToFindRecords')"
          :data="orderEntry.searchUnitResponse.data">
          <el-table-column
              prop="unitId"
              :label="$t('common.unit')"
              align="center"
              min-width="100">
              <template slot-scope="scope">
                <span class="font-size-14px"> {{ scope.row.unitId }} </span>
              </template>
          </el-table-column>
          <el-table-column
            align="center" min-width="100"
            :label="$t('common.options')"
            v-if="!orderEntry.isCreatingExtension">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="$t('warehouse.orderEntry.print')" placement="top-start">
                <print-unit-label :unitId="scope.row.unitId" :labelPrinted.sync="scope.row.labelPrinted" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('warehouse.orderEntry.delete')" placement="top-start">
                <i v-if="showDeleteButton()" class="el-icon-delete icon-action" type="primary" size="mini" @click="handleDelete(scope.row.unitId, scope.row.shipDate, orderEntry.searchUnitResponse.data)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center" min-width="100"
            :label="$t('warehouse.orderEntry.extensions.requestExtension')"
            v-if="orderEntry.isCreatingExtension">
            <template slot-scope="scope">
                <el-checkbox :value="isCheckedExtension(scope.row.id)" @change="handleUpdateSelectedUnitConsolidate(scope.row.id)"  label="" class="green-indeterminate-checkbox"></el-checkbox>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSearchChangeLimit"
        @current-change="findUnitsByConsignee"
        :current-page.sync="orderEntry.actualFiltersUnits.page"
        :page-size="orderEntry.actualFiltersUnits.rows"
        :page-sizes="sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="orderEntry.searchUnitResponse.totalRows">
      </el-pagination>
      <el-button id="btn-ok-dialog-extensions-bottom" class="btn-ok-dialog-extensions" type="primary" size="mini" @click="dialogVisible = false" v-if="orderEntry.isCreatingExtension"> {{ $t('common.ok') }}</el-button>
    </el-dialog>
</span>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import PrintUnitLabel from './PrintUnitLabel';

export default {
  components: { PrintUnitLabel },
  computed: {
    ...mapGetters([
      'orderEntry',
      'extensions'
    ])
  },
  props: {
    unitsConsolidateId: {
      type: Number,
      default: null
    },
    consigneeAccountId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      sizes: constants.TABLES.DEFAULT_LIMIT_SIZES,
      search: ''
    };
  },
  methods: {
    handleClose(done) {
      this.$store.dispatch('orderEntry/search', {});
      done();
    },
    handleOpenDialog() {
      this.dialogVisible = true;
      this.findUnitsByConsignee(constants.TABLES.DEFAULT_PAGE);
    },
    handleSearchChangeLimit(val) {
      this.$store.dispatch('orderEntry/findUnits', { rows: val, page: constants.TABLES.DEFAULT_PAGE });
    },
    handleSearchUnit() {
      this.findUnitsByConsignee(constants.TABLES.DEFAULT_PAGE);
    },
    findUnitsByConsignee(page) {
      const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);
      return this.$store.dispatch('orderEntry/findUnits', {
        unitsConsolidateId: this.unitsConsolidateId, unitId: this.search, page, returnAllUnitIds: this.getReturnAllUnitIdsExtensions()
      }).then(({ data }) => {
        loading.close();
        // if we are in extensions mode and unitIds comes, then we need to update the unitIds selected for consolidate,
        // this happens when it checks the consolidate, then when we open this detail dialog the selected unitIds are filled.
        if (this.orderEntry.isCreatingExtension && data.unitIds) {
          this.$store.dispatch('extensions/updateUnitsAfterLoadDetail', { consolidateId: this.unitsConsolidateId, consigneeAccountId: this.consigneeAccountId, unitIds: data.unitIds });
        }
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: error.response.data.message,
          type: 'error',
          duration: constants.duration
        });
        loading.close();
      });
    },
    handleDeleteAction(id, close) {
      const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);
      this.$store.dispatch('orderEntry/deleteUnit', id).then((response) => {
        loading.close();
        this.$message.success(response.message);
        this.$store.dispatch('orderEntry/search', {});
        if (close) {
          this.dialogVisible = false;
        } else {
          this.$store.dispatch('orderEntry/findUnits', { id: this.unitsConsolidateId });
        }
      }).catch((error) => {
        loading.close();
        this.$message({
          showClose: true,
          message: error.response.data.message,
          type: 'error',
          duration: constants.MESSAGES.LONG_DURATION
        });
      });
    },
    handleDelete(id, shipDate) {
      let message = this.$t('warehouse.orderEntry.unitDeleteConfirmation');
      message = message.replace('[id]', id).replace('[shipDate]', shipDate);

      if (this.orderEntry.searchUnitResponse.data.length === 1) {
        return this.$confirm(this.$t('warehouse.orderEntry.lastUnitDeleteConfirmation'), { confirmButtonText: this.$t('common.yes') })
          .then(() => {
            this.handleDeleteAction(id, true);
          })
          .catch(() => {});
      }
      return this.$confirm(message, { confirmButtonText: this.$t('common.yes') })
        .then(() => {
          this.handleDeleteAction(id);
        });
    },
    showDeleteButton() {
      const hasDeletePermission = this.$can(this.permissions.DATA_ENTRY.DELETE_AFTER_CUTOFF_FINALIZED, this.orderEntry.headerUnitList.status)
           || this.$can(this.permissions.DATA_ENTRY.DELETE_AFTER_CUTOFF_PENDING, this.orderEntry.headerUnitList.status)
           || this.$can(this.permissions.DATA_ENTRY.DELETE_BEFORE_CUTOFF_FINALIZED, this.orderEntry.headerUnitList.status)
           || this.$can(this.permissions.DATA_ENTRY.DELETE_BEFORE_CUTOFF_PENDING, this.orderEntry.headerUnitList.status);
      return hasDeletePermission;
    },
    getActualConsolidateExtensions() {
      if (Object.prototype.hasOwnProperty.call(this.extensions.selectedByConsignee, this.consigneeAccountId)) {
        const consolidationSelected = this.extensions.selectedByConsignee[this.consigneeAccountId].consolidations.find(c => c.id === this.unitsConsolidateId);
        return consolidationSelected;
      }
      return null;
    },
    getReturnAllUnitIdsExtensions() {
      let returnAllUnitIds = false;
      if (this.orderEntry.isCreatingExtension) {
        const consolidationSelectedExists = this.getActualConsolidateExtensions();
        if (consolidationSelectedExists) {
          returnAllUnitIds = consolidationSelectedExists.allDetailsCheckedInitially;
        }
      }
      return returnAllUnitIds;
    },
    isCheckedExtension(unitId) {
      const consolidationSelectedExists = this.getActualConsolidateExtensions();
      if (consolidationSelectedExists) {
        const unitIdSelected = consolidationSelectedExists.units.find(u => u === unitId);
        if (unitIdSelected) {
          return true;
        }
        return false;
      }
      return false;
    },
    handleUpdateSelectedUnitConsolidate(unitId) {
      const unitConsolidationSelected = {
        consigneeAccountId: this.orderEntry.headerUnitList.consigneeAccountId,
        consigneeAccountName: this.orderEntry.headerUnitList.consigneeName,
        consolidateId: this.unitsConsolidateId,
        consolidateTotal: this.orderEntry.headerUnitList.numberUnits,
        unitId
      };
      this.$store.dispatch('extensions/updateSelecteUnit', unitConsolidationSelected);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
  .search-unitid-div {
    padding: 0px !important;
    margin-bottom: 20px !important;
  }

  .label-search-unitid {
    text-align: left !important;
  }
  .btn-ok-dialog-extensions {
    float: right;
  }
</style>
