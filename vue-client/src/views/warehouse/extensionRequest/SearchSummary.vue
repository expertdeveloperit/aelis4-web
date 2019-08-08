<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" class="table-ds">
      <el-table-column
        prop="extensionHash"
        :label="$t('extensionRequest.extensionHash')"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="shipperNameAndAccount"
        :label="$t('extensionRequest.shipperNameAndAccount')"
        min-width="300"
      ></el-table-column>
      <el-table-column
        prop="shipperAccount"
        :label="$t('extensionRequest.shipperAccount')"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="extensionTime"
        :label="$t('extensionRequest.extensionTime')"
        width="200"
      ></el-table-column>
      <el-table-column prop="units" :label="$t('extensionRequest.units')" width="50"></el-table-column>
      <el-table-column
        prop="shipperContact"
        :label="$t('extensionRequest.shipperContact')"
        width="200"
      ></el-table-column>
      <el-table-column prop="requestDate" :label="$t('extensionRequest.requestDate')" width="130"></el-table-column>
      <el-table-column prop="status" :label="$t('extensionRequest.status')" width="80">
        <v-icon class="clockimg">
          <img src="@/assets/svg/Status-Clock.svg" alt="Status-Clock" />
        </v-icon>
      </el-table-column>
      <el-table-column prop="options" :label="$t('extensionRequest.options ')" width="160">
        <extension-details-dialog />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ExtensionDetailsDialog from './extensionDetailsDialog';

export default {
  name: 'SearchSummary',
  components: {
    ExtensionDetailsDialog
  },
  data() {
    return {
      tableData: [{
        extensionHash: 60470,
        shipperNameAndAccount: 'Bello Blossom LLC',
        shipperAccount: 'M542365',
        extensionTime: '13:25',
        units: 3,
        shipperContact: 8574125632,
        requestDate: '20/12/2019 13:25'
      },
      {
        extensionHash: 60470,
        shipperNameAndAccount: 'Bello Blossom LLC',
        shipperAccount: 'M542365',
        extensionTime: '13:25',
        units: 3,
        shipperContact: 8574125632,
        requestDate: '20/12/2019 13:25'
      }]
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.table-ds {
    padding: 15px;
}
.table-ds .has-gutter th {
    background-color: #0f335b;
    color: #fff;
    padding: 5px 0;
    font-size: 10px;
    font-weight: 500;
}
.table-ds .el-table__row td {
    padding: 5px 0;
    font-size: 10px;
    font-weight: 500;
}
.table-ds .has-gutter th, .table-ds .el-table__row td {
    text-align: center;
}
.clockimg {
  img {
    width: 15px;
    vertical-align: middle;
  }
}
.search-icon{
  .dialog-btn {
    width: 17px;
    padding: 0;
  }
  >img{
    width: 15px;
    vertical-align: middle;
  }
}
</style>
