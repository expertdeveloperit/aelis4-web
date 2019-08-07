<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" class="table-ds">
      <el-table-column
        prop="extensionHash"
        :label="$t('extensionRequest.extensionHash')"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="shipperNameAndAccount"
        :label="$t('extensionRequest.shipperNameAndAccount')"
        width="300"
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
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 13.9 13.9"
            style="enable-background:new 0 0 13.9 13.9;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M6.9,0C3.1,0,0,3.1,0,6.9s3.1,6.9,6.9,6.9s6.9-3.1,6.9-6.9S10.8,0,6.9,0z M6.9,12.4c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5
            s5.5,2.5,5.5,5.5S10,12.4,6.9,12.4z"
                />
                <path
                  d="M10.6,6.7H7.4V3c0-0.3-0.3-0.6-0.6-0.6S6.3,2.7,6.3,3v4.3c0,0.3,0.3,0.6,0.6,0.6h3.7c0.3,0,0.6-0.3,0.6-0.6
            S10.9,6.7,10.6,6.7z"
                />
              </g>
            </g>
          </svg>
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
  svg {
    width: 15px;
    fill: #f8bc06;
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
