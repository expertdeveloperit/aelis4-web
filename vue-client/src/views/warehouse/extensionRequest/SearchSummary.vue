<template>
  <div class="height-100-p">
    <el-form :model="editForm" ref="editForm">
      <el-table
        :data="constants.EXTENSION_REQUEST.SUMMARY_DATA"
        id="extension-data-list"
        size="mini"
        tooltip-effect="dark"
        sortable
        class="dark-blue-table"
        :empty-text="$t('common.notAbleToFindRecords')"
        @sort-change="handleSortChange(data)"
        stripe
      >
        <el-table-column
          prop="extensionHash"
          sortable="custom"
          :label="$t('extensionRequest.extensionHash')"
          width="150px"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.extensionHash"
              placement="top"
            >
              <span>{{ scope.row.extensionHash }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipperNameAndAccount"
          :label="$t('extensionRequest.shipperNameAndAccount')"
          :min-width="10"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.shipperNameAndAccount"
              placement="top"
            >
              <span>{{ scope.row.shipperNameAndAccount }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="extensionTime"
          :label="$t('extensionRequest.extensionTime')"
          :min-width="5"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.extensionTime"
              placement="top"
            >
              <span>{{ scope.row.extensionTime }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="units" :label="$t('extensionRequest.units')" :min-width="5">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.units" placement="top">
              <span>{{ scope.row.units }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipperContact"
          :label="$t('extensionRequest.shipperContact')"
          :min-width="8"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.shipperContact"
              placement="top"
            >
              <span>{{ scope.row.shipperContact }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <div class="request-Date">
          <el-table-column
            prop="requestDate"
            :label="$t('extensionRequest.requestDate')"
            :min-width="8"
          ></el-table-column>
        </div>
        <el-table-column prop="status" :label="$t('extensionRequest.status')" :min-width="8">
          <template slot-scope="scope">
            <v-icon class="clockimg">
              <img
                v-if="scope.row.status === constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[0].value"
                src="@/assets/svg/Status-Clock.svg"
                alt="Status-Clock"
              />
              <img
                v-if="scope.row.status === constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[1].value"
                src="@/assets/svg/Approved-Logo.svg"
                alt="Approved-Logo"
              />
              <img
                v-if="scope.row.status === constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[2].value"
                src="@/assets/svg/Deny-Logo.svg"
                alt="Deny-Logo"
              />
            </v-icon>
          </template>
        </el-table-column>
        <el-table-column prop="options" :label="$t('extensionRequest.options ')" :min-width="4">
          <template>
            <extension-details-dialog :extensionNo="scope.row.extensionHash" />
            <extension-details-dialog :extensionNo="scope.row.number" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      v-show="extensionRequest.total > 0"
      @size-change="handleSearchChangeLimit"
      :page-sizes="sizes"
      :page-size="extensionRequest.actualFilters.rows"
      :current-page.sync="extensionRequest.actualFilters.page"
      @current-change="handleSearchChangePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="extensionRequest.total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import ExtensionDetailsDialog from './extensionDetailsDialog';

export default {
  name: 'SearchSummary',
  components: {
    ExtensionDetailsDialog
  },
  computed: {
    ...mapGetters(['extensionRequest'])
  },
  data() {
    return {
      editForm: {
        shipper: '',
        aelTerminal: '',
        receivingdate: new Date(),
        status: constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[0].value,
        extensionNo: null,
        img: null
      },
      constants
    };
  },
  created() {
    if (constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[0].value === 0) {
      this.img = '@/assets/svg/Status-Clock.svg'
    } else if (constants.EXTENSION_REQUEST.EXTENSIONS_STATUS[0].value === 1) {
      this.img = '@/assets/svg/Status-Clock.svg';
    } else {
      this.img = '@/assets/svg/Status-Clock.svg';
    }
  },
  method: {
    handleSearchChangePage(val) {
      this.$store.dispatch('extensionRequest/search', { page: val });
    },
    handleSearchChangeLimit(val) {
      this.$store.dispatch('extensionRequest/search', { rows: val, page: constants.TABLES.DEFAULT_PAGE });
    },
    handleSortChange(data) {
      let { prop } = data;
      const { order } = data;
      prop = constants.TABLES.EXTENSION_REQUEST.COLUMNS_MAP_SORT[prop] || prop;
      this.$store.dispatch('extensionRequest/search', { orderField: prop, orderDirection: constants.TABLES.ORDER_DIRECTION[order] });
    },
    handleSearch() {
     this.editForm.status =  this.$refs['filter-status'].getLocalModel();
     this.$store.dispatch('extensionRequest/search', this.editForm);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.search-summary {
  padding: 15px;
}
.el-table__header {
  th {
    text-align: center ;
  }
}
.is-scrolling-none {
   td {
    text-align: center ;
    .cell {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .clockimg {
         height: 15px;
        img {
          height: 15px;
          width: 15px;
        }
      }
    }
   }
}
#height-100-p {
    .request-Date {
       font-weight: 600;
       }
}
@media only screen and (min-width: 1680px) {
#height-100-p {
    .consignee-filter {
        width: 725px;
        .el-form-item__content {
            width: 80%;
        }
    }
}
}
</style>
