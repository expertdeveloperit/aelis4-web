<template>
  <span>
    <el-button type="success" plain @click="handleOpenDialog" size="mini" class="dialog-btn">
      <v-icon class="el-icon-search header-info-dialog-value icon-action" icon="el-icon-plus"></v-icon>
    </el-button>
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('extensionRequest.extensionDetails')"
      :visible.sync="dialogVisible"
      width="60%"
      class="extension-dialog"
    >
      <el-form ref="form" v-circular-tab-navigation-dialog label-position="top" size="mini">
        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.extensionHash') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.number }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.status') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span
            class="span-small-list"
          >{{extensionRequest.headerUnitList.status === 0 ? $t('extensionRequest.pending'):extensionRequest.headerUnitList.status === 1 ? $t('extensionRequest.approved') : $t('extensionRequest.deny')}}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.shipper') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.shipperAccountName }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.shippingHour') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.shippingHour }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.applicantName') }}</label>
        </el-col>
        <el-col :span="18" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.applicantName }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.email') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.email }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.shipperContact') }}</label>
        </el-col>
        <el-col :span="6" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.contactNumber }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.notes') }}</label>
        </el-col>
        <el-col :span="18">
          <span class="span-small-list scroll-div">{{ extensionRequest.headerUnitList.notes }}</span>
        </el-col>

        <el-col :span="6" class="list-name">
          <label class="margin-bottom-small-list">{{ $t('extensionRequest.boxes') }}</label>
        </el-col>
        <el-col :span="18" class="list-name">
          <span class="span-small-list">{{ extensionRequest.headerUnitList.numberUnits }}</span>
        </el-col>

        <div>
          <span class="shipment-table">{{$t('extensionRequest.shipmentDetails')}}</span>
          <el-table
            :data="extensionRequest.searchUnitResponse.data"
            style="width: 100%"
            class="td-grid"
          >
            <el-table-column prop="Consignee" :label="$t('extensionRequest.consignee')">
              <template slot-scope="scope">
                <span class="font-size-14px">{{ scope.row.consigneeAccountName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Dimensions" :label="$t('extensionRequest.dimensions')">
              <template slot-scope="scope">
                <span
                  class="font-size-14px"
                >{{ scope.row.length }}x{{ scope.row.width }}x{{ scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Units" :label="$t('extensionRequest.units')">
              <template slot-scope="scope">
                <span class="font-size-14px">{{ scope.row.numberUnits }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span></span>
      <span slot="footer" class="dialog-footer footer-btn">
        <el-button @click="dialogVisible = false" class="deny-btn">
          <img src="@/assets/svg/Deny-Logo.svg" alt="Deny-Logo" />
          {{$t('extensionRequest.deny')}}
        </el-button>
        <el-button type="primary" @click="dialogVisible = false" class="approved-btn">
          <img src="@/assets/svg/Approved-Logo.svg" alt="Approved-Logo" />
          {{$t('extensionRequest.approved')}}
        </el-button>
        <div class="block pag">
          <span class="demonstration"></span>
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
      </span>
    </el-dialog>
  </span>
</template>
<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';

export default {
  computed: {
    ...mapGetters(['orderEntry',
      'extensionRequest'
    ])
  },
  props: {
    extensionNo: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$store.dispatch('extensionRequest/search', {});
      done();
    },
    handleSearchChangePage(val) {
      this.$store.dispatch('extensionRequest/search', { page: val });
    },
    handleSearchChangeLimit(val) {
      this.$store.dispatch('extensionRequest/search', { rows: val, page: constants.TABLES.DEFAULT_PAGE });
    },
    handleOpenDialog() {
      this.dialogVisible = true;
      this.findExtensionsByShipper(constants.TABLES.DEFAULT_PAGE);
    },
    findExtensionsByShipper(page) {
      const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);
      return this.$store.dispatch('extensionRequest/findUnits', { extensionNo: this.extensionNo, page }).then(() => {
        loading.close();
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: error.response.data.message,
          type: 'error',
          duration: constants.duration
        });
        loading.close();
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">

body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Open Sans, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-weight: 400;
}
  .dialog-btn {
        background: transparent !important;
        border: 0 !important;
        padding: 0;
  }
  .shipment-table {
    color : #01355F;
    float: left;
    padding-bottom: 10px;

  }
  .extension-dialog .el-dialog {
   width: 400px;
     font-family: Open Sans, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }
    .td-grid {
 td{
   .cell{
     font-size: 14px !important;
   color:#606266 ;
   }
 }
 th  {
  .cell{
     font-size: 11px !important;
  }
 }
}

.scroll-div {
     overflow-y: auto;
   white-space: normal;
   text-overflow: unset;
    max-width: 470px;
    max-height: 43px;
}
.detail-wrp {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    .ex-button {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .ex-button-wrp {
            display: inline-flex;
            flex-direction: column;
            span {
                font-size: 11px;
            }
            .pending-btn {
                padding: 9px 0;
                background: #fff5de;
                color: #d19d4c;
                border: 1px solid #d19d4c;
                font-size: 11px;
                    width: 100px;
                    margin-left: 12px;
              display: flex;
                span {
                    display: flex;
                    align-items: center;
                     font-size: 14px;
                         margin-left: 15px;

                }
                img {
                    height: 13px;
                    margin-right: 14px
                }
            }
        }
    }
    .ex-detail {
        width: 70%;
        border-right: 3px solid #01355F;
        p {
            font-size: 14px;
            text-align: left;
            margin: 0;
        }
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            text-align: left;
            font-size: 14px;
            padding-left: 0;
            display: flex;
            align-items: center;
            img {
                height: 13px;
                margin-right: 6px;
            }
            &:last-child {
                margin-left: 10px;
            }
        }
    }
}
.footer-btn {
     &.footer-wrp {
       display: block;
       margin-top: 15px  !important;
   }
     .deny-btn, .approved-btn {
       padding: 9px 0;
       background: #ffd7d8;
       color: #a32327;
       border: 1px solid #a32327;
       font-size: 11px;
       width: 100px;
       display: inline-flex;
       margin-left: 15px !important;
       span {
         display: flex;
         align-items: center;
         font-size: 11px;
         margin: auto;
       }
       img {
         height: 13px;
         margin-right: 7px
       }
     }
     .approved-btn  {
       background: #d8ecda;
       color: #52ac64;
       border: 1px solid #52ac64;
     }
   }
    @media only screen and (max-width: 992px) {
      .extension-dialog .el-dialog {
        width:500px;
      }
      .list-name {
            width: 50%;
        }
    }
    @media only screen and (max-width: 480px) {
     .extension-dialog {
       .el-dialog {
            width: auto;
            margin: 0 15px
       }
     }
    .detail-wrp {
      .ex-detail {
        width: 100%;
        border-right: 0;
        border-bottom: 3px solid #01355F;
        padding-bottom: 20px;
      }
        .ex-button {
          width: 100%;
          padding-top: 7px;
        }
      }
      .list-name  {
      .margin-bottom-small-list, .span-small-list {
        font-size: 8px;
      }
    }
    }

</style>
