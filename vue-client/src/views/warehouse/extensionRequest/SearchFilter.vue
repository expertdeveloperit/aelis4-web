<template>
  <el-col :span="24">
    <el-collapse v-model="orderEntry.filtersOpen">
      <el-collapse-item
        :title="$t('extensionRequest.searchSection')"
        name="search-section"
        id="search-section"
      >
        <el-form
          :model="searchForm"
          ref="searchForm"
          id="search"
          label-position="right"
          size="mini"
          inline
        >
          <el-form-item prop="shipper" class="consignee-filter consignee-wrp">
            <autocomplete
              :model.sync="searchForm.shipper"
              :strict="false"
              :url="urlShipper"
              :placeholder="$t('extensionRequest.shipper')"
              labelField="name"
              labelfieldSelected="name"
              valueField="id"
              valueFieldAdditional="name"
              :maxlength="8"
              id="search-shipper-list"
              ref="search-shipper-list"
            />
          </el-form-item>
          <el-form-item
            class="aelTerminal"
            :label="$t('extensionRequest.aelTerminal')"
            prop="status"
          >
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
          <el-form-item
            :label="$t('extensionRequest.receivingDate')"
            prop="shipDate"
            class="el_label receivingDate"
          >
            <el-date-picker
              ref="filter-datepicker"
              @change="handleChangeDate"
              v-model="searchForm.placeholder"
              format="MM/dd/yyyy"
              clearable
              :placeholder="$t('extensionRequest.dateFormat')"
              :picker-options="orderEntry.shipDatePickerOptions"
              class="el-dropdown-new drop-sp date-dob"
              type="date"
              id="searchForm-ship-date"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            :label="$t('extensionRequest.extensionStatus')"
            prop="status"
            class="title-input"
          >
            <el-select
              :placeholder="$t('extensionRequest.none')"
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
          <el-form-item prop="orderNumber" class="el-input--mini-new-status ordernumber">
            <el-input
              v-model="searchForm.orderNumber"
              ref="filter-order-number"
              v-alphanumeric-validation
              maxlength="25"
              clearable
              :placeholder="$t('extensionRequest.orderNumber')"
              @clear="handleSearch"
              v-on:keyup.enter.native="handleSearch"
              class="inline-input"
              id="searchForm-order-number"
            ></el-input>
          </el-form-item>
          <el-button class="el_button-new">{{$t('extensionRequest.submit')}}</el-button>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex';
import { Loading } from 'element-ui';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
import Autocomplete from '@/components/Autocomplete';

export default {
  name: 'SearchFilters',
  components: { Autocomplete },
  computed: {
    ...mapGetters([
      'orderEntry',
      'user',
      'shippers',
    ])
  },
  data() {
    return {
      searchForm: {
        shipper: '',
        aelTerminal: '',
        receivingdate: new Date(),
        status: constants.ORDER_ENTRY.ORDER_STATUS[0].value,
        orderNumber: null,
        page: constants.TABLES.DEFAULT_PAGE
      },
      activeCollapsibleName: ['search-section'],
      orderStatusOptions: constants.ORDER_ENTRY.ORDER_STATUS,
      orderCreatedByOptions: constants.ORDER_ENTRY.CREATED_BY_OPTIONS,
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER,
      urlShipper: apiConstants.END_POINTS.ACCOUNTS.SHIPPERS
      // value1: '',
    };
  },
  methods: {
    search(resetSearch) {
      // If sarch text is changed or reset search is mandatory we call to resetShipperList
      if ((this.searchText !== this.shippers.filters.search) || resetSearch) {
        this.$store.dispatch('account/resetShipperList');
      }
      return this.$store.dispatch('account/getShipperListScroll', this.searchText);
    },
    async change(shipperSelected) {
      this.$store.dispatch('setUserShipperAccount', shipperSelected);
      const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
      await this.callSelectAction();
      loading.close();
      this.show = false;
    },
    openList() {
      this.show = !this.show;
      // Its necessary nextTick because we need to wait the component render.
      if (this.show) {
        this.$nextTick(() => {
          this.$refs['search-shipper-list'].focus();
        });
      }
    },
    async callSelectAction() {
      if (this.actionStrSelectChained) {
        for (const action of this.actionStrSelectChained) {
          if (action === 'orderEntry/getSettings') {
            const res = await this.$store.dispatch(action);
            this.orderEntry.settings.minCubesPerBox = res.__ob__.value.minCubesPerBox;
            // this.orderEntry.settings.minCubesPerBox = res.__ob__.value.minCubesPerBox ? res.__ob__.value : '0.9461';
          } else {
            await this.$store.dispatch(action);
          }
        }
      }
    }
  },
  async mounted() {
    const resetSearch = true;
    if (this.user.shipperAccountNumber) {
      this.callSelectAction();
      // Call reset search but without loading because the shippers is already selected, and no need await.
      this.search(resetSearch);
    } else {
      const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
      await this.search(resetSearch);
      this.show = this.shippers.list && this.shippers.list.length > 1;

      // SHIPPERS Users Normal Flow: If the list of shippers only returns 1, then we select it by default.
      if (this.shippers.list && this.shippers.list.length === 1) {
        this.change(this.shippers.list[0]);
      }
      loading.close();
    }

    // Its necessary nextTick because we need to wait the component render.
    if (this.show) {
      this.$nextTick(() => {
        this.$refs['search-shipper-list'].focus();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    label {
      font-size: 10px;
      padding-left: 15px;
    }
    .consignee-filter {
        width: 30%;
        white-space: nowrap;
        margin-right: 0;
        padding-right: 10px;
        .el-form-item__content {
            width: 100%;
            .el-autocomplete {
              width: 100%;
            }
        }
    }
    .aelTerminal {
      width: 15%;
      margin-right: 0 !important;
      padding-right: 10px;
      display: flex !important;
      .el-form-item__content {
         width: calc(100% - 92px);
      }
    }
    .receivingDate {
        width: 18%;
         margin-right: 0 !important;
      padding-right: 10px;
      display: flex !important;
        .el-form-item__content {
         width: calc(100% - 99px);
         .date-dob input {
           width: 100%;
         }
        }
    }
    .title-input {
      width: 18%;
      display: flex;
      margin: 0 !important;
      padding-right: 10px;
      .el-form-item__content {
        width: calc(100% - 110px);
      }
    }
    .ordernumber {
         width: 15%;
      margin: 0 !important;
      margin-right: auto;
      .el-form-item__content{
        width: calc(96% - 48px);
      }
    }
    #form-search-button {
      margin-right: 10px;
    }
}

.el_button-new {
  height: 28px;
    padding: 0 16px;
    margin: 0px 0 0px -50px;
    box-sizing: border-box;
    float: right;
    font-size: 12px;
    border-color: #01355f;
    color: #01355f;

}
.ordernumber input {
  text-align: center;
}
.el-input__icon.el-icon-date {
  display: none;
}
.date-dob {
      width: auto !important;
}
.date-dob input {
     padding: 0 13px !important;
    width: 110px;
    height: 28px;
}

.el_label {
    line-height: 28px;
    font-size: 10px;
    color: #aba9a9;
}
@media only screen and (max-width: 1400px) {
  #search {

    .consignee-filter {
        width: 20%;

    }
    .aelTerminal {
      width: 17%;
    }
    .receivingDate {
      width: 20%;
    }
    .title-input {
      width: 21%;
    }
    .ordernumber {
         width: 17%;
    }
  }
}
@media only screen and (max-width: 1365px) {
  #search{

    .consignee-filter {
        width: 100%;
        padding-right: 0;
    }
    .aelTerminal, .receivingDate, .title-input {
         width: 33.333%;
    }
    .ordernumber {
         width: calc(96% - 65px);
         .el-form-item__content {
            width: 100%;
        }
    }
  }
}
@media only screen and (max-width: 767px) {
  #search {
    .aelTerminal, .receivingDate, .title-input, .aelTerminal .el-form-item__content .el-select, .receivingDate .el-date-editor, .title-input .el-select {
         width: 100% !important;
         padding-right: 0;
    }
    .title-input {
      margin-bottom: 18px !important;
    }
  }
}
</style>
