<template>
  <div class="height-100-p">
    <el-table
      :data="tableData"
      id="extension-data-list"
      size="mini"
      tooltip-effect="dark"
      sortable
      class="dark-blue-table"
      :empty-text="$t('common.notAbleToFindRecords')"
      @sort-change="handleSortChange"
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
          <el-tooltip class="item" effect="dark" :content="scope.row.extensionHash" placement="top">
            <span>1234</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="shipperNameAndAccount"
        :label="$t('extensionRequest.shipperNameAndAccount')"
        :min-width="10"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
            <span>Bello Blossom LLC - M542365</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="extensionTime"
        :label="$t('extensionRequest.extensionTime')"
        :min-width="5"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
            <span>13:25</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="units" :label="$t('extensionRequest.units')" :min-width="5">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
            <span>3</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="shipperContact"
        :label="$t('extensionRequest.shipperContact')"
        :min-width="8"
      ></el-table-column>
      <el-table-column
        prop="requestDate"
        :label="$t('extensionRequest.requestDate')"
        :min-width="8"
      ></el-table-column>
      <el-table-column prop="status" :label="$t('extensionRequest.status')" :min-width="4">
        <v-icon class="clockimg">
          <img src="@/assets/svg/Status-Clock.svg" alt="Status-Clock" />
        </v-icon>
      </el-table-column>
      <el-table-column prop="options" :label="$t('extensionRequest.options ')" :min-width="4">
        <extension-details-dialog />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ExtensionDetailsDialog from './extensionDetailsDialog';
import constants from '@/utils/constants';

export default {
  name: 'SearchSummary',
  components: {
    ExtensionDetailsDialog
  },
  data() {
    return {
      tableData: [{
        extensionHash: '60470',
        shipperNameAndAccount: 'Bello Blossom LLC - M542365',
        extensionTime: '13:25',
        units: 3,
        shipperContact: 8574125632,
        requestDate: '20/12/2019 13:25'
      },
      {
        extensionHash: '60470',
        shipperNameAndAccount: 'Bello Blossom LLC - M542365',
        extensionTime: '13:25',
        units: 3,
        shipperContact: 8574125632,
        requestDate: '20/12/2019 13:25'
      }],
      searchSummary: {
        id: null,
      }
    };
  },
  method: {
    handleSortChange(data) {
      let { prop } = data;
      const { order } = data;
      prop = constants.TABLES.ORDER_ENTRY.COLUMNS_MAP_SORT[prop] || prop;
      this.$store.dispatch('orderEntry/search', {
        orderField: prop,
        orderDirection: constants.TABLES.ORDER_DIRECTION[order]
      });
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
