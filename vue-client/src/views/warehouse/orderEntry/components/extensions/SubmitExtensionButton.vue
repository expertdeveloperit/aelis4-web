<template>
<span>
  <el-button id="btn-open-dialog-submit-extension" type="primary" size="mini" @click="dialogVisible = true"> {{ $t('common.submit') }}</el-button>
  <el-dialog
    :close-on-click-modal="false"
    v-on:open="handleOpen"
    :title="$t('warehouse.orderEntry.extensions.extensionRequest')"
    :visible.sync="dialogVisible"
    width="40%"
    id="submit-extension-dialog"
    class="dialog-with-cols"
    :before-close="handleClose">
    <div id="submit-extension-div">
      <el-form :model="form" :rules="formRules" ref="form" label-position="top" size="mini" class="form-with-cols">
      <el-col :span="24">
          <el-col :md="12" :sm="24" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.shipDate')" prop="shipDate">
                <el-date-picker
                  v-model="form.shipDate"
                  :disabled="true"
                  :default-value="orderEntry.actualFilters.shipDate"
                  style="width: 100%"
                  format="MM/dd/yyyy"
                  :picker-options="orderEntry.shipDatePickerOptions"
                  type="date"
                  id="form-extensions-ship-date">
                </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="12" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.hour')" prop="shippingHour">
                <el-time-select
                  id="form-extensions-shipping-hour"
                  ref="form-shipping-hour"
                  style="width: 100%"
                  placeholder="Start time"
                  v-model="form.shippingHour"
                  :picker-options="datePickerHourOptions">
                </el-time-select>
              </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.applicantName')" prop="applicantName">
                <el-input
                  v-model="form.applicantName"
                  maxlength="80"
                  clearable
                  class="inline-input"
                  id="form-extensions-applicant-name">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('common.email')" prop="email">
                <el-input
                  v-model="form.email"
                  maxlength="100"
                  clearable
                  class="inline-input"
                  id="form-extensions-email">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24" class="form-vertical-item">
              <el-form-item :label="$t('warehouse.orderEntry.contactNumber')" prop="contactNumber">
                <el-input
                  v-model="form.contactNumber"
                  maxlength="15"
                  clearable
                  class="inline-input"
                  id="form-extensions-contact-number">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24" class="form-vertical-item">
            <el-form-item :label="$t('warehouse.orderEntry.extensions.notes')" prop="notes">
              <el-input
                v-model="form.notes"
                type="textarea"
                maxlength="200"
                show-word-limit
                clearable
                class="inline-input"
                id="form-extensions-notes"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <!--- TABLE SUMMARY --->
          <el-col :md="24" :sm="24" :xs="24">
            <div class="height-100-p summary-extension-submit">
              <el-table
                :data="summary"
                id="summary-extension-submit-list"
                size="mini"
                tooltip-effect="dark"
                sortable
                class="dark-blue-table"
                :empty-text="$t('warehouse.orderEntry.extensions.noShipmentsSelected')"
                stripe>
                <el-table-column
                  prop="consigneeAccountName"
                  :sortable="true"
                  :min-width="75"
                  align="center"
                  :label="$t('warehouse.orderEntry.consignee')">
                </el-table-column>
                <el-table-column
                  prop="totalUnits"
                  :sortable="true"
                  :min-width="25"
                  :label="$t('warehouse.orderEntry.units')">
                </el-table-column>
                </el-table>
              </div>
            </el-col>
            <!--- END TABLE SUMMARY --->
        </el-col>
        </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false" size="mini">{{ $t('common.cancel') }}</el-button>
       <el-button type="primary" @click="handleSubmit" size="mini" class="margin-r-18" id="btn-submit-extension">{{ $t('common.submit') }}</el-button>
    </div>
  </el-dialog>
</span>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapGetters([
      'orderEntry',
      'user',
      'extensions'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      datePickerHourOptions: {
        step: '00:15',
        end: '23:59'
      },
      form: {
        shipDate: new Date(),
        shippingHour: null,
        applicantName: null,
        contactNumber: null,
        email: null
      },
      summary: [],
      formRules: {
        shipDate: [
          { required: true, message: this.$t('warehouse.orderEntry.error.shipDateRequired'), trigger: 'blur' }
        ],
        shippingHour: [
          { required: true, message: this.$t('warehouse.orderEntry.error.hourRequired'), trigger: 'blur' }
        ],
        applicantName: [
          { required: true, message: this.$t('warehouse.orderEntry.error.applicantNameRequired'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('signUp.errors.emailRequired'), trigger: 'blur' },
          { type: 'email', message: this.$t('signUp.errors.emailValid'), trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleOpen() {
      this.form.applicantName = this.user.name;
      this.form.email = this.user.email;
      const currentHour = moment();
      const cutOffHour = moment(this.orderEntry.settings.cutoffHourForToday, 'HH:mm:ss');
      const minHour = currentHour.isAfter(cutOffHour) ? currentHour.format('HH:mm') : cutOffHour.format('HH:mm');
      this.datePickerHourOptions.start = minHour;

      // Clear summary info and update with the store value.
      this.summary = [];
      for (const consigneeAccountId in this.extensions.selectedByConsignee) {
        if (Object.prototype.hasOwnProperty.call(this.extensions.selectedByConsignee, consigneeAccountId)) {
          this.summary.push(this.extensions.selectedByConsignee[consigneeAccountId]);
        }
      }

      // NextTick is excecuted when from is ready and then we can put the focus.
      this.$nextTick(() => {
        this.$refs['form-shipping-hour'].focus();
      });
    },
    formValidate() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          let validLengthExtensionDetail = false;
          if (valid) {
            for (const consigneeAccountId in this.extensions.selectedByConsignee) {
              if (Object.prototype.hasOwnProperty.call(this.extensions.selectedByConsignee, consigneeAccountId)) {
                validLengthExtensionDetail = this.extensions.selectedByConsignee[consigneeAccountId].consolidations.length > 0;
                if (validLengthExtensionDetail) {
                  break;
                }
              }
            }
            if (!validLengthExtensionDetail) {
              this.$message.warning(this.$t('warehouse.orderEntry.extensions.selectShipmentsFirst'));
            }
          }
          resolve(valid && validLengthExtensionDetail);
        });
      });
    },
    async handleSubmit() {
      const valid = await this.formValidate();
      if (valid) {
        const confirmSubmitExtension = await this.$confirm(this.$t('warehouse.orderEntry.extensions.confirmSubmitExplanation'), { confirmButtonText: this.$t('common.yes'), dangerouslyUseHTMLString: true }).catch(() => {});
        if (confirmSubmitExtension) {
          const response = await this.$store.dispatch('extensions/submit', Object.assign({ shipperAccountId: this.orderEntry.actualFilters.shipperAccountId }, this.form)).catch(() => {});
          if (response) {
            this.$store.dispatch('orderEntry/setIsCreatingExtension', false);
            this.dialogVisible = false;
            this.$refs.form.resetFields();
            const message = `<div class="alert-success-extension-submit">
              <div class="container-clock-extension">
                <i class="far fa-clock icon-clock-extension"></i>
              </div>
              <div class="text-message-extension">
                ${response.message}
              </div>
            </div>`;
            this.$store.dispatch('orderEntry/search', {});
            this.$alert(message, {
              dangerouslyUseHTMLString: true
            });
          }
        }
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
#btn-open-dialog-submit-extension {
  margin-left: 10px;
}
.summary-extension-submit {
  margin-top: 10px;
  margin-bottom: 10px;
}
.alert-success-extension-submit {
  display: flex;
  align-items: center;
  .container-clock-extension {
    width: 20%;
    display: inline;
    .icon-clock-extension {
      font-size: 62px;
      color: orange
    }
  }
  .text-message-extension {
    width: 80%;
    display: inline;
  }
}
</style>
