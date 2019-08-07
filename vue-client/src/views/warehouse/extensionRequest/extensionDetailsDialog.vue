<template>
  <span v-if="isVisible()">
    <el-button type="success" plain @click="dialogVisible = true" size="mini" class="dialog-btn">
      <v-icon class="search-icon">
        <img src="@/assets/svg/search.svg" alt="search" />
      </v-icon>
    </el-button>
    <el-dialog
      :close-on-click-modal="false"
      v-on:open="handleOpen"
      :title="$t('extensionRequest.extensionDetails')"
      :visible.sync="dialogVisible"
      max-width="400px"
      class="extension-dialog"
    >
      <!-- :before-close="handleClose" -->
      <el-form
        :model="form"
        :rules="formRules"
        ref="form"
        v-circular-tab-navigation-dialog
        label-position="top"
        size="mini"
      >
        <div>
          <div class="ex-detail">
            <p>Case</p>
            <p>Shipper Account</p>
            <p>Shipper Name</p>
            <p>Email Address</p>
            <p>Time</p>
            <p>Wait</p>
          </div>
          <div class="ex-button">
            <el-button type="primary" @click="dialogVisible = false" class="pending-btn">Confirm</el-button>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
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
import { Message } from 'element-ui';
import moment from 'moment';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
// import Autocomplete from '@/components/Autocomplete';

const formConsignee = 'form-consignee';

export default {
//   components: { Autocomplete },
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
      }],
      currentPage3: 1,
      dialogVisible: false,
      form: {
        consigneeAccountId: null,
        unitOfMeasure: constants.ORDER_ENTRY.UNIT_OF_MEASURE_LIST[0].value,
        measure: constants.ORDER_ENTRY.MEASURE_LIST[0].value,
        shipDate: new Date(),
        totalUnits: null,
        length: null,
        width: null,
        height: null,
        productCode: '',
        productDescription: '',
        po: '',
        farmName: ''
      },
      formRules: {
        consigneeAccountId: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.consigneeRequired'),
            trigger: 'submit'
          }
        ],
        unitOfMeasure: [
          {
            required: true,
            message: this.$t(
              'warehouse.orderEntry.error.unitOfMeasureRequired'
            ),
            trigger: 'blur'
          }
        ],
        shipDate: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.shipDateRequired'),
            trigger: 'blur'
          }
        ],
        length: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.lengthRequired'),
            trigger: 'blur'
          }
        ],
        width: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.widthRequired'),
            trigger: 'blur'
          }
        ],
        height: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.heightRequired'),
            trigger: 'blur'
          }
        ],
        totalUnits: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.numberUnitsRequired'),
            trigger: 'blur'
          }
        ]
      },
      unitOfMeasureOptions: constants.ORDER_ENTRY.UNIT_OF_MEASURE_LIST,
      measureOptions: constants.ORDER_ENTRY.MEASURE_LIST,
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER,
      urlProduct: apiConstants.END_POINTS.PRODUCT_SEARCH
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleOpen() {
      this.form.shipDate = moment(
        this.orderEntry.actualFilters.shipDate,
        'YYYY-MM-DD'
      ).toDate();
      this.$nextTick(() => {
        this.form.consigneeAccountId = this.orderEntry.actualFilters.consigneeAccountId;
        this.$refs[formConsignee].setLocalModel(
          this.orderEntry.actualFilters.consigneeName
        );
        this.$refs.form.$el[0].focus();
      });
    },
    handleClose(done) {
      this.resetForm();
      done();
    },
    async submitForm() {
      const minValue = this.orderEntry.settings.minCubesPerBox;

      let length;
      let width;
      let height;

      if (this.form.measure === constants.ORDER_ENTRY.MEASURE_LIST[1].value) {
        length = this.$refs.length.value * constants.ORDER_ENTRY.CONST_VALUE;
        width = this.$refs.width.value * constants.ORDER_ENTRY.CONST_VALUE;
        height = this.$refs.height.value * constants.ORDER_ENTRY.CONST_VALUE;
      } else {
        length = this.$refs.length.value;
        width = this.$refs.width.value;
        height = this.$refs.height.value;
      }
      const volume = length * width * height;
      if (volume <= minValue) {
        let message = this.$t('warehouse.orderEntry.error.minValueValidationError');
        message = message.replace('[unit]', this.$refs.unit.value).replace('[minValue]', minValue);
        const confirm = await this.$confirm(message, { confirmButtonText: this.$t('OK') });
        if (confirm) {
          return this.getSubmitForm();
        }
        return false;
      } if (volume > constants.ORDER_ENTRY.MAX_VALUE) {
        let message = this.$t('warehouse.orderEntry.error.maxValueValidationError');
        message = message.replace('[minValue]', minValue).replace('[max_value]', constants.ORDER_ENTRY.MAX_VALUE);
        this.$message.warning(message);
        return false;
      }
      return this.getSubmitForm();
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.form.consigneeId = null;
      this.form.productCode = '';
      this.form.productDescription = '';
      this.$refs['form-product'].clearLocalModel();
      this.$refs[formConsignee].clearLocalModel();
      this.form.shipDate = moment(
        this.orderEntry.actualFilters.shipDate,
        'YYYY-MM-DD'
      ).toDate();
      this.$nextTick(() => {
        this.form.consigneeAccountId = this.orderEntry.actualFilters.consigneeAccountId;
        this.$refs[formConsignee].setLocalModel(
          this.orderEntry.actualFilters.consigneeName
        );
      });
      this.$refs.form.$el[0].focus();
    },
    /* The datepicker has an issue when change manually, the focus is lost. */
    handleChangeDate() {
      this.$refs.form.$el[4].focus();
    },
    isVisible() {
      return (
        this.$can(this.permissions.DATA_ENTRY.ADD_SHIPMENT)
        || this.$can(this.permissions.DATA_ENTRY.ADD_SHIPMENT_AFTER_CUTOFF)
      );
    },
    getSubmitForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            Message.closeAll();
            const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);
            this.$store
              .dispatch('orderEntry/save', this.form)
              .then((response) => {
                loading.close();
                this.$message.success(response.message);
                this.resetForm();
                this.$refs.form.$el[0].focus();
                this.$store.dispatch('orderEntry/search', {});
                resolve(response);
              })
              .catch((error) => {
                loading.close();
                reject(error);
              });
          } else {
            reject(new Error(this.$t('common.invalid')));
          }
        });
      });
    }
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
    max-width: 400px;
}
.ex-detail{
    width: 50%
}
.ex-button{
    position: relative;
    bottom: 130px;
    text-align: right;
}
</style>
