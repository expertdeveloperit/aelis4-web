<template>
  <span>
    <div class="app-view-container">
      <div class="app-view-title">
        {{ $t('extensionRequest.title') }}
        <span class="app-view-title-span">
          <img src="@/assets/svg/faq.svg" alt="faq" />
          {{ $t('extensionRequest.FAQ') }}
        </span>
      </div>
      <el-row :gutter="20" type="flex" align="stretch">
        <search-filter />
      </el-row>
      <el-row :gutter="20" type="flex" align="stretch">
        <el-col :span="24">
          <div class="search-summary-container bg-white">
            <div class="search-summary">
              <search-summary />
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="block pag">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev,pager, next, jumper"
          :total="10"
        ></el-pagination>
      </div>
    </div>
  </span>
</template>
<script>

import SearchFilter from './SearchFilter';
import SearchSummary from './SearchSummary';

export default {
  name: 'extensionRequest',
  components: {
    SearchFilter,
    SearchSummary
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    }
  },
  data() {
    return {
      currentPage3: 1
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.app-view-title-span {
  float: right;
    font-size: 11px;
    padding-top: 4px;
    color: #43425d;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.app-view-title-span img {
  width: 14px;
    margin-right: 7px;
    height: 14px;
}
@media only screen and (max-width: 400px) {
.app-view-title {
    display: flex;
    flex-wrap: wrap;
}
.app-view-container {
    margin: 15px 15px;;
}
}
.search-summary-container {
  margin-top: 20px;
  position: relative;
  .search-summary {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
  }
}
.pag {
    text-align: center;
    .btn-prev, .btn-next {
      font-size: 16px;
      padding: 0 !important;
      background: transparent !important;
      min-width: auto;
      margin: 0 10px;
      .fa {
        font-size: 12px;
      }
  }
  .number {
    background: transparent;
    min-width: 20px;
  }
  .el-pagination__jump{
     margin-left: 12px;
  }
  span.el-pagination__jump {
    font-size: 10px;
    margin-left: 3px;
}
.el-input {
  width: 45px;
      font-size: 12px;
}
}


</style>
