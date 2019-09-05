<template>
<span>
  <el-button id="btn-open-dialog-add-consignee-shipper" icon="el-icon-plus" size="mini" @click="dialogVisible = true" class="button-action-default"></el-button>
  <el-dialog
    :close-on-click-modal="false"
    v-on:open="handleOpen"
    :title="$t('warehouse.orderEntry.accounts.shipperConsignee')"
    :visible.sync="dialogVisible"
    width="40%"
    id="add-consignee-shipper-dialog"
    :before-close="handleClose">
    <div class="explanation-add-shipper-consignee">
      <span>{{ $t('warehouse.orderEntry.accounts.addConsigneeShipperRelationExplanation') }}</span>
    </div>
    <div id="add-consignee-shipper-div">
      <autocomplete
        :model.sync="consigneeAccountId"
        :url="urlConsignee"
        labelField="name"
        labelFieldLastWithDash="number"
        :selectAction="handleSearch"
        :enterKeyAction="handleSearch"
        :shipperAccountId="orderEntry.settings.shipperAccountId"
        :placeholder="$t('warehouse.orderEntry.accounts.enterConsigneeCustomerAccount')"
        classCss="width-85p"
        valueField="id"
        id="add-consignee-autocomplete"
        ref="add-consignee-autocomplete"/>
        <span>
          <el-tooltip class="item" effect="dark" :content="$t('warehouse.orderEntry.search')" placement="top-start">
            <el-button id="add-consignee-search-button" @click="handleSearch" icon="el-icon-search" size="mini" class="button-action-default"></el-button>
          </el-tooltip>
        </span>

        <div class="consignee-account-info" v-if="consigneeSelected.name">
          <div>
            <b><i class="far fa-user"></i> {{ consigneeSelected.name }} - {{ consigneeSelected.number }}</b>
          </div>
          <div>
            <i class="el-icon-location-outline"></i> {{ consigneeSelected.address }}, {{ consigneeSelected.state }}, {{ consigneeSelected.city }} {{ consigneeSelected.zipCode }}
          </div>
          <div>
            <i class="el-icon-phone-outline"></i> {{ consigneeSelected.phone }}
          </div>
        </div>

        <div class="consignee-days-of-service-info" v-if="consigneeSelected.name">
          <table cellspacing="0" cellpadding="0" border="0" class="dark-blue-table el-table consignee-days-of-service-table">
            <thead>
              <tr class="">
                <th colspan="7" rowspan="1" class="is-leaf">
                  <div class="cell">{{ $t('common.daysOfService') }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.monday, 'disabled-day': !consigneeSelected.daysOfService.monday }">
                  <div class="cell">{{ $t('days.mondayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.tuesday, 'disabled-day': !consigneeSelected.daysOfService.tuesday }">
                  <div class="cell">{{ $t('days.tuesdayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.wednesday, 'disabled-day': !consigneeSelected.daysOfService.wednesday }">
                  <div class="cell">{{ $t('days.wednesdayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.thursday, 'disabled-day': !consigneeSelected.daysOfService.thursday }">
                  <div class="cell">{{ $t('days.thursdayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.friday, 'disabled-day': !consigneeSelected.daysOfService.friday }">
                  <div class="cell">{{ $t('days.fridayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.saturday, 'disabled-day': !consigneeSelected.daysOfService.saturday }">
                  <div class="cell">{{ $t('days.saturdayShort') }}</div>
                </td>
                <td rowspan="1" colspan="1" :class="{ 'enabled-day': consigneeSelected.daysOfService.sunday, 'disabled-day': !consigneeSelected.daysOfService.sunday }">
                  <div class="cell">{{ $t('days.sundayShort') }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <span v-if="!haveDaysOfService && consigneeSelected.name">{{ $t('warehouse.orderEntry.accounts.consigneeDontHaveDaysOfService') }}</span>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-tooltip class="item" v-if="consigneeSelected.name" effect="dark" :content="$t('warehouse.orderEntry.addConsignee')" placement="top-start">
        <el-button id="btn-add-consignee-shipper" icon="el-icon-plus" size="mini" @click="handleAddConsigneeShipperRelation" class="button-action-default" ></el-button>
      </el-tooltip>
      <el-tooltip class="item" v-if="consigneeSelected.name" effect="dark" :content="$t('warehouse.orderEntry.clear')" placement="top-start">
        <el-button id="btn-clear-consignee-info" icon="fa fa-eraser" size="mini" @click="clear" class="button-action-default" ></el-button>
      </el-tooltip>
    </div>
  </el-dialog>
</span>
</template>

<script>
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
import Autocomplete from '@/components/Autocomplete';

export default {
  components: { Autocomplete },
  computed: {
    ...mapGetters([
      'orderEntry',
      'user'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      consigneeAccountId: null,
      consigneeSelected: {},
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_TYPE,
      haveDaysOfService: false
    };
  },
  methods: {
    handleClose(done) {
      this.clear();
      done();
    },
    handleOpen() {
      this.$nextTick(() => {
        this.$refs['add-consignee-autocomplete'].$el.getElementsByTagName('input')[0].focus();
      });
    },
    async handleAddConsigneeShipperRelation() {
      const confirm = await this.$confirm(`${this.$t('warehouse.orderEntry.accounts.addConsigneeShipperRelationConfirm')}`, { confirmButtonText: this.$t('common.yes') }).catch(() => {});
      if (!confirm) { return false; }
      Message.closeAll();
      const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);

      try {
        await this.$store.dispatch('account/addConsigneeShipperRelation', { shipperAccountId: this.orderEntry.actualFilters.shipperAccountId, consigneeAccountId: this.consigneeSelected.id });
        this.$message.success(this.$t('warehouse.orderEntry.accounts.addConsigneeShipperRelationSuccess'));
        this.dialogVisible = false;
        this.clear();
      } catch (error) {
        return false;
      } finally {
        loading.close();
      }
      return true;
    },
    handleSearch(item) {
      Object.assign(this.consigneeSelected, item);
      this.haveDaysOfService = this.consigneeSelected.daysOfService.monday || this.consigneeSelected.daysOfService.tuesday || this.consigneeSelected.daysOfService.wednesday || this.consigneeSelected.daysOfService.thursday || this.consigneeSelected.daysOfService.friday || this.consigneeSelected.daysOfService.saturday || this.consigneeSelected.daysOfService.sunday;
      this.clearAutocomplete();
    },
    clear() {
      this.consigneeSelected = {};
      this.clearAutocomplete();
      this.$refs['add-consignee-autocomplete'].$el.getElementsByTagName('input')[0].focus();
    },
    clearAutocomplete() {
      this.consigneeAccountId = null;
      this.$refs['add-consignee-autocomplete'].clearLocalModel();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
#btn-open-dialog-add-consignee-shipper {
  margin-left: 10px;
}
#add-consignee-search-button {
  float: right;
}
#btn-clear-consignee-info {
  margin-right: 20px;
}
#add-consignee-shipper-div {
  padding-right: 20px;
  padding-left: 20px;
  .consignee-account-info {
    margin-top: 20px;
  }
  .consignee-days-of-service-info {
    margin-top: 20px;
    margin-bottom: 12px;
    .consignee-days-of-service-table {
      th {
        text-align: center;
        font-size: 14px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      td {
        font-weight: bold;
        border-left: 2px solid #fafffa;
        text-align: center;
        text-transform: uppercase;
        padding-top: 5px;
        padding-bottom: 5px;
        &:first-of-type {
          border-left: none;
        }
      }
      .enabled-day {
        color: #008D00;
        background-color: rgba(0, 141, 0, 0.15);
      }
      .disabled-day {
        color: #9b9b9b;
        background-color: #EFEFEF;
      }
    }
  }
}
.explanation-add-shipper-consignee{
        margin-top: -18px;
        margin-bottom: 17px;
        color: #838181;
}
</style>
