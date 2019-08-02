<template>
  <el-col :span="24">
    <el-collapse v-model="orderEntry.filtersOpen">
      <el-collapse-item
        :title="$t('extensionRequest.searchSection')"
        name="search-section"
        id="search-section"
      >
        <el-form>
          <div class="demo-input-size">
            <el-input
              size="mini"
              :placeholder="$t('extensionRequest.shipper')"
              class="el-input--mini-new"
            ></el-input>
            <span class="title-input">{{ $t('extensionRequest.aelTerminal') }}</span>
            <el-dropdown size="mini" split-button type="primary" class="el-dropdown-new drop-sp">
              MIA
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Action 1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="title-input">{{ $t('extensionRequest.receivingDate') }}</span>
            <el-date-picker
              v-model="value1"
              type="date"
              :placeholder="$t('extensionRequest.dateFormat')"
              class="el-dropdown-new drop-sp date-dob"
            ></el-date-picker>
            <span class="title-input">{{ $t('extensionRequest.extensionStatus') }}</span>
            <el-dropdown size="mini" split-button type="primary" class="el-dropdown-new drop-sp">
              {{$t('extensionRequest.none')}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Action 1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input
              size="mini"
              :placeholder="$t('extensionRequest.orderNumber')"
              class="el-input--mini-new-status ordernumber"
            ></el-input>
            <el-button class="el_button-new">Default</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchFilter',
  computed: {
    ...mapGetters([
      'orderEntry'
    ])
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: ''
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-input--mini-new {
    font-size: 12px;
    margin-left: 5px;
    width: 26%;
}
.el-input--mini-new-status {
    font-size: 12px;
    margin-left: 25px;
    width: 15%;
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
.drop-sp .el-button--mini {
    padding: 7px 8px;
    background-color: transparent;
    color: #DCDFE6;
    border-color: #DCDFE6;
}
.drop-sp .el-dropdown__caret-button {
      padding: 7px 0;
}
.el-input__icon.el-icon-date {
  display: none;
}
.drop-sp .el-dropdown__icon {
    font-size: 12px;
    margin: 0 6px 0 0;
}
.drop-sp.el-dropdown .el-dropdown__caret-button:before {
  display: none;
}
.drop-sp {
    margin: 0 0 0 7px;
}
.el-button-group .drop-sp .el-button--primary:first-child {
      border-right-color:transparent;
}
.title-input {
    margin-left: 25px;
    font-size: 11px;
    color: #a9a9a9;
}
.date-dob {
      width: auto !important;
}
.date-dob input {
      padding: 0 13px !important;
    width: 110px;
    height: 28px;
}
.ordernumber input {
  text-align: center;
}
</style>
