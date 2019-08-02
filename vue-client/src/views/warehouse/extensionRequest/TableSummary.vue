<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" class="table-ds">
      <el-table-column prop="date" :label="$t('extensionRequest.extensionHash')" width="95"></el-table-column>
      <el-table-column
        prop="date"
        :label="$t('extensionRequest.shipperNameAndAccount')"
        width="210"
      ></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.shipperAccount')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.extensionTime')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.units')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.shipperContact')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.requestDate')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.status')"></el-table-column>
      <el-table-column prop="date" :label="$t('extensionRequest.options ')"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'SearchFilter',
  data() {

  }
};
</script>
<style>
.table-ds {
    padding: 15px;
}
.table-ds .has-gutter th {
    background-color: #0f335b;
    color: #fff;
    padding: 5px 0;
    font-size: 13px;
    font-weight: 500;
}
.table-ds .has-gutter th, .table-ds .has-gutter td {
    text-align: center;
}
</style>
