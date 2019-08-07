<template>
  <el-col :span="17">
    <el-collapse v-model="orderEntry.filtersOpen">
      <el-collapse-item
        :title="$t('warehouse.orderEntry.searchSection')"
        name="search-section"
        id="search-section"
      >
        <el-form
          :model="searchForm"
          ref="searchForm"
          id="search-form"
          label-position="right"
          label-width="95px"
          size="mini"
          inline
        >
          <el-form-item :label="$t('warehouse.orderEntry.terminal')">
            <el-input
              v-model="orderEntry.settings.warehouseCode"
              disabled
              maxlength="30"
              clearable
              class="inline-input"
              id="searchForm-aelTerminal"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('warehouse.orderEntry.shipDate')" prop="shipDate">
            <el-date-picker
              ref="filter-datepicker"
              @change="handleChangeDate"
              format="MM/dd/yyyy"
              v-model="searchForm.shipDate"
              :picker-options="orderEntry.shipDatePickerOptions"
              type="date"
              id="searchForm-ship-date"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('warehouse.orderEntry.status')" prop="status">
            <el-select
              v-model="searchForm.status"
              id="searchForm-status"
              ref="filter-status"
              @change="handleSearch"
            >
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('warehouse.orderEntry.orderNumberShort')" prop="orderNumber">
            <el-input
              v-model="searchForm.orderNumber"
              ref="filter-order-number"
              v-alphanumeric-validation
              maxlength="25"
              clearable
              @clear="handleSearch"
              v-on:keyup.enter.native="handleSearch"
              class="inline-input"
              id="searchForm-order-number"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('warehouse.orderEntry.consignee')"
            prop="consigneeAccountId"
            class="consignee-filter"
          >
            <autocomplete
              :model.sync="searchForm.consigneeAccountId"
              :url="urlConsignee"
              labelField="name"
              labelFieldLastWithDash="number"
              :selectAction="handleSearch"
              :enterKeyAction="handleSearch"
              :clearAction="handleSearch"
              :classCss="null"
              :shipperAccountId="orderEntry.settings.shipperAccountId"
              valueField="id"
              id="searchForm-consignee"
              ref="filter-consignee"
            />
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('warehouse.orderEntry.addConsignee')"
              placement="top-start"
            >
              <add-consignee-shipper-button />
            </el-tooltip>
          </el-form-item>
          <el-form-item :label="$t('warehouse.orderEntry.createdBy')" prop="createdByUsername">
            <el-select
              v-model="searchForm.createdByUsername"
              id="searchForm-createdByUsername"
              ref="filter-createdByUsername"
              @change="handleSearch"
            >
              <el-option
                v-for="item in orderCreatedByOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('warehouse.orderEntry.search')"
              placement="top-start"
            >
              <el-button
                id="form-search-button"
                @click="handleSearch"
                icon="el-icon-search"
                size="mini"
                class="button-action-default"
              ></el-button>
            </el-tooltip>
          </span>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
import Autocomplete from '@/components/Autocomplete';
import AddConsigneeShipperButton from './components/AddConsigneeShipperButton';
import authRoles from '@/utils/auth/roles';

export default {
  name: 'SearchFilter',
  components: { Autocomplete, AddConsigneeShipperButton },
  computed: {
    ...mapGetters([
      'orderEntry',
      'user'
    ])
  },
  data() {
    return {
      searchForm: {
        shipDate: new Date(),
        status: constants.ORDER_ENTRY.ORDER_STATUS[0].value,
        createdByUsername: constants.ORDER_ENTRY.CREATED_BY_OPTIONS[0].value,
        orderNumber: null,
        consigneeAccountId: null,
        consigneeName: null,
        page: constants.TABLES.DEFAULT_PAGE
      },
      activeCollapsibleName: ['search-section'],
      orderStatusOptions: constants.ORDER_ENTRY.ORDER_STATUS,
      orderCreatedByOptions: constants.ORDER_ENTRY.CREATED_BY_OPTIONS,
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER
    };
  },
  methods: {
    handleSearch() {
      this.searchForm.consigneeName = this.$refs['filter-consignee'].getLocalModel();
      this.$store.dispatch('orderEntry/search', this.searchForm).then(() => {
        this.$store.dispatch('orderEntry/getCutoffLimitDate');
      });
    },
    /* The datepicker has an issue when change manually, the focus lost. */
    handleChangeDate() {
      this.handleSearch();
      this.$refs['filter-status'].focus();
    }
  },
  mounted() {
    const isShipper = this.user.roles.some(role => (authRoles.SHIPPER === role));
    this.orderCreatedByOptions[1].value = this.user.name;
    if (isShipper) {
      // Asign the option myOrders value the name of the current user if user is shipper.
      this.searchForm.createdByUsername = this.user.name;
    }
    this.$store.dispatch('orderEntry/setSummaryFilters', this.searchForm);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#search-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .consignee-filter {
        width: 65%;
        white-space: nowrap;
        .el-form-item__content {
            width: calc(100% - 95px);
            .el-autocomplete {
              width: calc(100% - 54px);
            }
        }
    }
    .el-date-editor {
      width: 140px;
    }
    .inline-input {
      width: 140px;
    }
    .el-select {
      width: 140px;
    }
    #form-search-button {
      margin-right: 10px;
    }
}
@media only screen and (min-width: 1680px) {
#search-form {
    .consignee-filter {
        width: 725px;
        .el-form-item__content {
            width: 80%;
        }
    }
}
}
</style>
