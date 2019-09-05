<template>
  <div>
    <el-collapse v-show="uploadXmlResponse.details.length || uploadXmlResponse.header.errorMessage || uploadXmlResponse.header.fileName" v-model="uploadXmlResponse.activeElement">
    <el-collapse-item :title="$t('uploadXmlFiles.xmlResponse')" name="xml-upload-response-collapsible" id="xml-upload-response-collapsible">
        <div class="header-response" id="header-response">
            <span class="response-field">{{ $t('common.orderNumberShort') }}: {{ uploadXmlResponse.header.orderNumber }}</span>
            <span class="response-field">{{ $t('common.shipdate') }}: {{ uploadXmlResponse.header.shipdate }}</span>
            <span class="response-field">{{ $t('common.shipper') }}: {{ uploadXmlResponse.header.shipper }}</span>
            <span class="response-field">{{ $t('common.unitsInFile') }}: {{ uploadXmlResponse.header.totalUnitsInFile }}</span>
            <span class="response-field">{{ $t('common.unitsSuccess') }}: {{ uploadXmlResponse.header.totalUnitsSuccess }}</span>
            <span class="response-field">{{ $t('common.unitsDuplicates') }}: {{ uploadXmlResponse.header.totalUnitsDuplicates }}</span>
            <span class="response-field">{{ $t('common.unitsDiscrepancy') }}: {{ uploadXmlResponse.header.totalUnitsDiscrepancy }}</span>
        </div>
        <div class="header-response-message" id="header-response-message" >
          <div v-if="uploadXmlResponse.header.errorMessage"><i class="el-icon-warning yellow-warning"></i> &nbsp; <span>{{ uploadXmlResponse.header.errorMessage }}</span></div>
          <div v-if="!uploadXmlResponse.details.length && !uploadXmlResponse.header.errorMessage && uploadXmlResponse.header.fileName"><i class="el-icon-success green-success"></i>&nbsp;<span>{{ $t('uploadXmlFiles.uploadSuccess') }}</span></div>
        </div>
        <div class="xml-table-response-data-container">
            <el-table v-if="uploadXmlResponse.details.length"
                id="response-data"
                size="mini"
                tooltip-effect="dark"
                class="xml-table-response-data"
                sortable
                :data="uploadXmlResponse.details">
                <el-table-column
                    prop="consignee"
                    width="270"
                    :label="$t('common.consigneeAccount')">
                    <template slot-scope="scope">
                        <span> {{ scope.row.consignee_name }} - {{ scope.row.consignee }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="unitsFailed"
                    width="100"
                    :label="$t('uploadXmlFiles.failedUnits')">
                </el-table-column>
                <el-table-column
                    prop="unitFailedDetail.unitID[0]"
                    width="120"
                    :label="$t('uploadXmlFiles.unitIds')">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unitFailedDetail.unitID.length === 1">{{scope.row.unitFailedDetail.unitID[0]}}</span>
                        <template v-else>
                            <el-popover
                                placement="right"
                                width="100"
                                trigger="hover">
                                <el-table :data="scope.row.unitFailedDetail.unitID" max-height="500">
                                    <el-table-column width="300" :label="$t('uploadXmlFiles.unitIds')">
                                        <template slot-scope="scopei">
                                            {{scopei.row}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button slot="reference" type="text" class="pop-over-unitIds-error">{{scope.row.unitFailedDetail.unitID[0]}}...</el-button>
                            </el-popover>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="message"
                    :label="$t('common.message')">
                </el-table-column>
            </el-table>
        </div>
    </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UploadResponse',
  computed: {
    ...mapGetters([
      'uploadXmlResponse'
    ])
  },
  data() {
    return {};
  },
  beforeDestroy() {
    this.$store.dispatch('clearXmlResponse');
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.header-response {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgba(0, 51, 91, 1);
    .response-field {
        font-size: 12px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-left: 10px;
        max-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.header-response-message {
  position: sticky;
  div {
    padding-top: 10px;
  }
}
.xml-table-response-data-container {
    height: 100%;
    overflow: auto;
    .xml-table-response-data.el-table {
        th.is-leaf{
            font-size: 11px;
            color: rgba(0, 51, 91, 1);
            border-bottom: 2px solid rgba(0, 51, 91, 1);
        }
    }
}

.pop-over-unitIds-error {
    color: #606266;
    font-size: 11px;
}

.upload-response {
  margin-top: 17px;
  height: 100%;
  .el-collapse-item__wrap {
      height: 100%;
  }
  .el-collapse {
      height: 100%;
  }
  .el-collapse-item {
      height: 100%;
  }
  .el-collapse-item__content {
      height: 100%;
      overflow: scroll
  }
}

@media only screen and (max-width: 830px) {
    .header-response {
        height: 100%;
        width: 100%;
        display: block;
        padding-left: 10px;
        padding-right: 10px;
        height: 90px;
        background-color: #00335b;
        display: flex;
        flex-wrap: wrap;
        .response-field {
            display: inline;
        }
    }
    .upload-response {
        height: 270px;
    }
}

@media only screen and (min-width: 1420px ) {
    .header-response {
        .response-field {
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .upload-response {
        height: 400px;
    }
}

</style>
