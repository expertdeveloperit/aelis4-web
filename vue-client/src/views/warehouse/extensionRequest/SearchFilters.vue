  <template>
  <el-col :span="24">
    <el-collapse v-model="extensionRequest.filtersOpen">
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
          <el-form-item
            :label="$t('extensionRequest.shipper')"
            prop="shipperAccountId"
            class="shipper-filter shipper-wrp"
          >
            <autocomplete
              :model.sync="searchForm.shipper"
              :strict="false"
              :url="urlShipper"
              labelField="name"
              labelFieldLastWithDash="number"
              :selectAction="handleSearch"
              :enterKeyAction="handleSearch"
              :clearAction="handleSearch"
              :classCss="null"
              valueField="id"
              id="searchForm-shipper"
              ref="search-shipper-list"
            />
          </el-form-item>
          <el-form-item
            class="aelTerminal"
            :label="$t('extensionRequest.aelTerminal')"
            prop="aelTerminal"
          >
            <el-select
              v-model="searchForm.aelTerminal"
              id="searchForm-aelTerminal"
              ref="filter-aelTerminal"
              @change="handleSearch"
            >
              <el-option
                v-for="item in searchFilerData"
                :key="item"
                :label="item.code"
                :value="item.id"
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
              v-model="searchForm.shipDate"
              format="MM/dd/yyyy"
              clearable
              :picker-options="extensionRequest.shipDatePickerOptions"
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
            :label="$t('extensionRequest.extensionHash')"
            prop="extensionNumber"
            class="el-input--mini-new-status ordernumber"
          >
            <el-input
              v-model="searchForm.extensionNumber"
              ref="filter-order-number"
              v-alphanumeric-validation
              maxlength="25"
              clearable
              v-on:keyup.enter.native="handleSearch"
              @clear="handleSearch"
              class="inline-input"
              id="searchForm-order-number"
            ></el-input>
          </el-form-item>
          <span>
            <el-tooltip class="item" effect="dark" :content="$t('Search')" placement="top-start">
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
import extensionService from '../../../api/extensionService';

export default {
  name: 'SearchFilters',
  components: { Autocomplete },
  computed: {
    ...mapGetters([
      'extensionRequest'
    ])
  },
  data() {
    return {
      searchForm: {
        shipper: '',
        shipperAccountId: '',
        aelTerminal: '',
        shipDate: new Date(),
        status: constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[0].value,
        extensionNumber: null

      },
      activeCollapsibleName: ['search-section'],
      orderStatusOptions: constants.EXTENSION_REQUEST.EXTENSIONS_STATUS,
      urlShipper: apiConstants.END_POINTS.ACCOUNTS.SHIPPERS,
      searchFilerData: constants.EXTENSION_REQUEST.searchFilterData
    };
  },
  methods: {
    handleSearch() {
      this.searchForm.shipper = this.$refs['search-shipper-list'].getLocalModel();
      this.$store.dispatch('extensionRequest/search', this.searchForm).then((res) => {
        constants.EXTENSION_REQUEST.SUMMARY_DATA = [];
        res.forEach((element) => {
          const ob = {
            extensionHash: element[0],
            shipperNameAndAccount: `${element[1]}-${element[3]}`,
            extensionTime: element[4],
            units: element[5],
            shipperContact: element[6],
            requestDate: element[7]
          };
          constants.EXTENSION_REQUEST.SUMMARY_DATA.push(ob);
        });
      });
    },
    /* The datepicker has an issue when change manually, the focus lost. */
    handleChangeDate() {
      this.handleSearch();
      this.$refs['filter-status'].focus();
    }
  },
  created() {
    extensionService.getWarehouse().then((response) => {
      this.searchFilerData = response.data;
      this.handleSearch();
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  #search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 5px;
    .shipper-filter {
      width: 30%;
      white-space: nowrap;
      margin-right: 0;
      padding-right: 10px;
      .el-form-item__content {
        width: calc(100% - 64px);
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
        width: calc(100% - 70px);
        .el-input__icon {
          width: 16px;
        }
        .el-input__inner {
          padding-right: 20px;
        }
      }
    }
    .receivingDate {
      width: 17%;
      margin-right: 0 !important;
      padding-right: 10px;
      display: flex !important;
      .el-form-item__content {
        width: calc(100% - 77px);
        .date-dob input {
          width: 100%;
          padding-right: 10px;
        }
      }
    }
    .title-input {
      width: 14%;
      display: flex;
      margin: 0 !important;
      padding-right: 10px;
      .el-form-item__content {
        width: calc(100% - 56px);
      }
    }
    .ordernumber {
      width:  calc(25% - 55px);
      margin: 0 !important;
      margin-right: auto;
      .el-form-item__content{
        width:calc(100% - 103px);
      }
    }
    #form-search-button {
      margin-right: 0;
    }
    .receivingDate .el-date-editor.el-input{
      width: 100%;
    }
  }
  @media only screen and (max-width: 1365px) {
    #search{
      .shipper-filter {
        width: 100%;
        padding-right: 0;
      }
      .aelTerminal {
        width: 25%;
      }
      .receivingDate {
        width: 25%;
      }
      .title-input {
        width: 20%;
      }
      .ordernumber {
        width: calc(30% - 55px);
      }
    }
  }
  @media only screen and (max-width: 992px) {
    #search {
      .shipper-filter {
        display: flex;
      }
      .aelTerminal, .receivingDate, .title-input, .aelTerminal .el-form-item__content .el-select, .receivingDate .el-date-editor, .title-input .el-select {
        width: 100% !important;
        padding-right: 0;
      }
      .ordernumber {
        width: calc(100% - 55px);
        padding-top: 18px;
      }
      #form-search-button {
        margin-top: 18px;
      }
    }
    #search .aelTerminal .el-form-item__content, #search .receivingDate .el-form-item__content,  #search .shipper-filter .el-form-item__content, #search .title-input .el-form-item__content  {
      width: calc(100% - 92px);
      margin-left: auto;
    }
  }

</style>
