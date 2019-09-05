<template>
<span v-if="isVisible()">
  <el-button id="btn-add-order" type="success" plain @click="dialogVisible = true" size="mini">{{ $t('warehouse.orderEntry.addOrder') }}</el-button>
  <el-dialog
  :close-on-click-modal="false"
  v-on:open="handleOpen"
  :title="$t('warehouse.orderEntry.addOrder')"
  :visible.sync="dialogVisible"
  width="85%"
  class="dialog-with-cols"
  :before-close="handleClose">
  <el-form :model="form" :rules="formRules" ref="form" label-position="top" size="mini">
      <el-row>
          <el-col :md="9" :sm="12" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.consignee')" prop="consigneeAccountId">
                  <autocomplete :model.sync="form.consigneeAccountId"
                      :url="urlConsignee"
                      :shipperAccountId="orderEntry.settings.shipperAccountId"
                      labelField="name"
                      labelFieldLastWithDash="number"
                      valueField="id"
                      id="form-consignee"
                      ref="form-consignee" />
              </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.shipDate')" prop="shipDate">
                  <el-date-picker
                  v-model="form.shipDate"
                  @change="handleChangeDate"
                  :default-value="orderEntry.actualFilters.shipDate"
                  style="width: 100%"
                  format="MM/dd/yyyy"
                  :picker-options="orderEntry.shipDatePickerOptions"
                  type="date"
                  id="form-ship-date">
                  </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :md="3" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.numberOfUnitsShort')"  prop="totalUnits">
                  <el-input-number
                  v-model="form.totalUnits"
                  v-numeric-validation
                  :precision="0"
                  :min="0" :max="999"
                  class="inline-input width-100p"
                  id="form-number-units"
                  ref="unit"
                  ></el-input-number>
              </el-form-item>
          </el-col>
          <el-col :md="4" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.farmName')" prop="farmName">
                  <autocomplete
                  :model.sync="form.farmName"
                  :strict="false"
                  :url="urlFarmName"
                  labelField="name"
                  labelfieldSelected="name"
                  valueField="id"
                  valueFieldAdditional="name"
                  :maxlength="100"
                  id="form-farm-name"
                  ref="form-farm-name"
                  />
              </el-form-item>
          </el-col>
          <el-col :md="3" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.poNumber')" prop="po">
                  <el-input
                  v-model="form.po"
                  v-alphanumeric-validation
                  maxlength="25"
                  clearable
                  class="inline-input"
                  id="form-po-number"
                  ></el-input>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :md="4" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.unitOfMeasure')" prop="unitOfMeasure">
                  <el-select v-model="form.unitOfMeasure" id="form-unit-of-measure" >
                      <el-option
                      v-for="item in unitOfMeasureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :md="3" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.measure')" prop="measure">
                  <el-select v-model="form.measure" id="form-measure">
                      <el-option
                      v-for="item in measureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="2" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.length')" prop="length">
                  <el-input-number
                  v-model="form.length"
                  v-numeric-validation
                  :controls="false"
                  :precision="2"
                  :min="0" :max="999.99"
                  class="inline-input width-100p"
                  id="form-length"
                  ref="length"
                  ></el-input-number>
              </el-form-item>
          </el-col>
          <el-col :md="2" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.width')"  prop="width">
                  <el-input-number
                  v-model="form.width"
                  v-numeric-validation
                  :controls="false"
                  :precision="2"
                  :min="0" :max="999.99"
                  class="inline-input width-100p"
                  id="form-width"
                  ref="width"
                  ></el-input-number>
              </el-form-item>
          </el-col>
          <el-col :md="2" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.height')" prop="height">
                  <el-input-number
                  v-model="form.height"
                  v-numeric-validation
                  :controls="false"
                  :precision="2"
                  :min="0" :max="999.99"
                  class="inline-input width-100p"
                  id="form-height"
                  ref="height"
                  ></el-input-number>
              </el-form-item>
          </el-col>
          <el-col :md="4" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.product')" prop="productCode">
                  <autocomplete
                  :model.sync="form.productCode"
                  :modelAdditional.sync="form.productDescription"
                  :strict="false"
                  :url="urlProduct"
                  labelField="code"
                  labelFieldLastWithDash="description"
                  labelfieldSelected="code"
                  valueField="code"
                  valueFieldAdditional="description"
                  :maxlength="5"
                  id="form-product"
                  ref="form-product"
                  />
              </el-form-item>
          </el-col>
          <el-col :md="7" :sm="24" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.productDescription')" prop="productDescription">
                  <el-input
                      v-model="form.productDescription"
                      v-alphanumeric-validation
                      maxlength="30"
                      clearable
                      class="inline-input"
                      id="form-product-description"
                  ></el-input>
              </el-form-item>
          </el-col>
      </el-row>
  </el-form>
  <div id="add-dialog-footer" slot="footer" class="dialog-footer form-vertical-item">
      <el-button type="primary" id="form-save-button" @click="submitForm()" size="mini">{{ $t('warehouse.orderEntry.addOrder') }}</el-button>
      <el-button id="form-refresh-button" @click="resetForm()" size="mini">{{ $t('warehouse.orderEntry.clear') }}</el-button>
  </div>
  </el-dialog>
</span>
</template>

<script>
import { Message } from 'element-ui';
import moment from 'moment';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
import Autocomplete from '@/components/Autocomplete';

const formConsignee = 'form-consignee';

export default {
  components: { Autocomplete },
  computed: {
    ...mapGetters([
      'orderEntry'
    ])
  },
  data() {
    return {
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
          { required: true, message: this.$t('warehouse.orderEntry.error.consigneeRequired'), trigger: 'submit' }
        ],
        unitOfMeasure: [
          { required: true, message: this.$t('warehouse.orderEntry.error.unitOfMeasureRequired'), trigger: 'blur' }
        ],
        shipDate: [
          { required: true, message: this.$t('warehouse.orderEntry.error.shipDateRequired'), trigger: 'blur' }
        ],
        length: [
          { required: true, message: this.$t('warehouse.orderEntry.error.lengthRequired'), trigger: 'blur' }
        ],
        width: [
          { required: true, message: this.$t('warehouse.orderEntry.error.widthRequired'), trigger: 'blur' }
        ],
        height: [
          { required: true, message: this.$t('warehouse.orderEntry.error.heightRequired'), trigger: 'blur' }
        ],
        totalUnits: [
          { required: true, message: this.$t('warehouse.orderEntry.error.numberUnitsRequired'), trigger: 'blur' }
        ]
      },
      unitOfMeasureOptions: constants.ORDER_ENTRY.UNIT_OF_MEASURE_LIST,
      measureOptions: constants.ORDER_ENTRY.MEASURE_LIST,
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER,
      urlProduct: apiConstants.END_POINTS.PRODUCT_SEARCH,
      urlFarmName: apiConstants.END_POINTS.ACCOUNTS.FARM_NAME_SEARCH
    };
  },
  methods: {
    handleOpen() {
      this.form.shipDate = moment(this.orderEntry.actualFilters.shipDate, 'YYYY-MM-DD').toDate();
      this.$nextTick(() => {
        this.form.consigneeAccountId = this.orderEntry.actualFilters.consigneeAccountId;
        this.$refs[formConsignee].setLocalModel(this.orderEntry.actualFilters.consigneeName);
        this.$refs.form.$el[0].focus();
      });
    },
    handleClose(done) {
      this.resetForm();
      done();
    },
    async submitForm() {
      const minValue = this.orderEntry.settings.minCubesPerBox;

      let { length, width, height } = this.form;

      if (this.form.measure === constants.ORDER_ENTRY.MEASURE_LIST[1].value) {
        length = this.form.length * constants.ORDER_ENTRY.INCH_CONVERSION_VALUE;
        width = this.form.width * constants.ORDER_ENTRY.INCH_CONVERSION_VALUE;
        height = this.form.height * constants.ORDER_ENTRY.INCH_CONVERSION_VALUE;
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
      this.$refs['form-farm-name'].clearLocalModel();
      this.form.shipDate = moment(this.orderEntry.actualFilters.shipDate, 'YYYY-MM-DD').toDate();
      this.$nextTick(() => {
        this.form.consigneeAccountId = this.orderEntry.actualFilters.consigneeAccountId;
        this.$refs[formConsignee].setLocalModel(this.orderEntry.actualFilters.consigneeName);
      });
      this.$refs.form.$el[0].focus();
    },
    /* The datepicker has an issue when change manually, the focus is lost. */
    handleChangeDate() {
      this.$refs.form.$el[4].focus();
    },
    isVisible() {
      return this.$can(this.permissions.DATA_ENTRY.ADD_SHIPMENT) || this.$can(this.permissions.DATA_ENTRY.ADD_SHIPMENT_AFTER_CUTOFF);
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
div#add-dialog-footer {
  display: -webkit-flex;
  -webkit-flex-direction: row-reverse;
  display: flex;
  flex-direction: row-reverse;
}

button#form-save-button {
  margin-left: 10px;
}
</style>
