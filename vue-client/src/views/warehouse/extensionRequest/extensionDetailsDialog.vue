<template>
  <span>
    <el-button type="success" plain @click="dialogVisible = true" size="mini" class="dialog-btn">
      <v-icon class="el-icon-search header-info-dialog-value icon-action" icon="el-icon-plus">

      </v-icon>
    </el-button>
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('extensionRequest.extensionDetails')"
      :visible.sync="dialogVisible"
      max-width="400px"
      class="extension-dialog"
    >
      <!-- :before-close="handleClose" -->
      <el-form ref="form" v-circular-tab-navigation-dialog label-position="top" size="mini">
        <div class="detail-wrp">
          <div class="ex-detail">
            <p>
              {{$t('extensionRequest.caseHash')}}
              <span>60471</span>
            </p>
            <p>
              {{$t('extensionRequest.shipperAccountColumn')}}
              <span>M000254</span>
            </p>
            <p>
              {{$t('extensionRequest.shipperName')}}
              <span>Halls Distribution centre</span>
            </p>
            <p>
              {{$t('extensionRequest.emailAddress')}}
              <span>fjaramillo@hallsdistributioncentre.com</span>
            </p>
            <ul>
              <li>
                <img src="@/assets/svg/Extension-Request.svg" alt="Extension-Request" />
                <strong>
                  {{$t('extensionRequest.extensionTimecolumn')}}
                  <span>13:45</span>
                </strong>
              </li>
              <li>
                <img src="@/assets/svg/Extension-Request.svg" alt="Extension-Request" />
                <strong>
                  {{$t('extensionRequest.totalBoxes')}}
                  <span>48</span>
                </strong>
              </li>
            </ul>
          </div>
          <div class="ex-button">
            <div class="ex-button-wrp">
              <span>{{$t('extensionRequest.status')}}</span>
              <el-button type="primary" @click="dialogVisible = false" class="pending-btn">
                <img src="@/assets/svg/Clock-Logo.svg" alt="Clock-Logo" />
                {{$t('extensionRequest.pending')}}
              </el-button>
            </div>
          </div>
        </div>
        <div>
          <span class="shipment-table">{{$t('extensionRequest.shipmentDetails')}}</span>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Consignee" :label="$t('extensionRequest.consignee')"></el-table-column>
            <el-table-column prop="Dimensions" :label="$t('extensionRequest.dimensions')"></el-table-column>
            <el-table-column prop="Units" :label="$t('extensionRequest.units')"></el-table-column>
          </el-table>
        </div>
      </el-form>
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev,pager, next, jumper"
            :total="10"
          ></el-pagination>
        </div>
      </span>
    </el-dialog>
  </span>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['orderEntry'])
  },
  data() {
    return {
      tableData: [{
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '3'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '15'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '12'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '4'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '8'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '3'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '3'
      }, {
        Consignee: 'Bello Blossom LLC',
        Dimensions: '40*10*5',
        Units: '3'
      }],
      currentPage3: 1,
      dialogVisible: false
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">

  .dialog-btn {
        background: transparent !important;
        border: 0 !important;
        padding: 0;
  }
  .shipment-table {
    color : #01355F;
    float: left;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .extension-dialog .el-dialog {
    width: 450px;
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
              display: flex;
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
        }
    }
    .ex-detail {
        width: 70%;
        border-right: 3px solid #01355F;
        p {
            font-size: 11px;
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
            font-size: 11px;
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
      .deny-btn, .approved-btn {
        padding: 9px 0;
        background: #ffd7d8;
        color: #a32327;
        border: 1px solid #a32327;
        font-size: 11px;
            width: 100px;
    display: inline-flex;
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
          padding-top: 10px;
        }
      }
    }

</style>
