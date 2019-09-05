<template>
<span v-show="isVisible()">
    <el-link id="btn-change-ship-date" class="btn-change-ship-date" @click="dialogVisible = true" size="mini" :underline="false">{{ $t('warehouse.orderEntry.changeShipDate') }}</el-link>
    <el-dialog
      :close-on-click-modal="false"
      v-on:open="handleOpen"
      :title="$t('warehouse.orderEntry.changeShipDate')"
      :visible.sync="dialogVisible"
      width="32%"
      id="change-ship-date-dialog"
      :before-close="handleClose">
      <el-form :model="changeShipDateform" :rules="formRules" ref="changeShipDateform" label-position="right" size="mini" inline class="text-align-end">
          <el-row>
            <el-col class="form-vertical-item">
            <el-form-item :label="$t('warehouse.orderEntry.newShipDate')" prop="newShipDate">
                <el-date-picker
                v-model="changeShipDateform.newShipDate"
                format="MM/dd/yyyy"
                :picker-options="shipDatePickerOptions"
                type="date"
                id="changeShipDateform-new-ship-date">
                </el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleChangeShipDate" size="mini" class="margin-r-18" id="btn-change-ship-date-move">{{ $t('common.move') }}</el-button>
      </div>
    </el-dialog>
</span>
</template>

<script>
import moment from 'moment';
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';

export default {
  computed: {
    ...mapGetters([
      'orderEntry',
      'hasOrderConsolidations'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      changeShipDateform: {
        newShipDate: null
      },
      formRules: {
        newShipDate: [
          { required: true, message: this.$t('warehouse.orderEntry.error.newShipDateRequired'), trigger: 'blur' }
        ]
      },
      shipDatePickerOptions: {}
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleOpen() {
      this.changeShipDateform.newShipDate = null;
      const currentShipDate = moment(this.orderEntry.actualFilters.shipDate, 'YYYY-MM-DD');
      const shipDateFutureDays = this.orderEntry.settings[constants.SETTINGS.shipDateFutureDays];
      this.shipDatePickerOptions = {
        disabledDate(time) {
          const momentTime = moment(time.getTime());
          return momentTime.isBefore(moment(), 'day')
          || momentTime.isAfter(moment().add(shipDateFutureDays || 0, 'days'), 'day')
          || currentShipDate.isSame(momentTime, 'days');
        }
      };
      this.$nextTick(() => {
        this.$refs.changeShipDateform.$el[0].focus();
      });
    },
    async confirmCutoffContinue() {
      await this.$store.dispatch('orderEntry/getCutoffLimitDateNewShipdate', this.changeShipDateform.newShipDate);
      await this.$store.dispatch('orderEntry/getCutoffLimitDate');
      let confirmCutoff = true;
      let confirmCutoffText = '';

      // Current ShipDate:
      if (this.orderEntry.cutoff.limitDateMillis === 0) {
        confirmCutoffText = this.$t('warehouse.orderEntry.changeShipDateCurrentDateMovedConfirm').replace('[shipDate]', moment(this.orderEntry.actualFilters.shipDate).format(constants.DATES.DEFAULT_DISPLAY_FORMAT));
      } else if (this.orderEntry.cutoff.limitDateMillisNewShipDate === 0) {
        // New ShipDate:
        confirmCutoffText = this.$t('warehouse.orderEntry.changeShipDatenewDateMovedConfirm').replace('[shipDate]', moment(this.changeShipDateform.newShipDate).format(constants.DATES.DEFAULT_DISPLAY_FORMAT));
      }
      // If one of two previous validations indicate that date cutoff closed
      if (confirmCutoffText) {
        confirmCutoff = await this.$confirm(confirmCutoffText, { confirmButtonText: this.$t('common.yes') }).catch(() => {});
      }
      return !!confirmCutoff;
    },
    async handleChangeShipDate() {
      return new Promise((resolve, reject) => {
        this.$refs.changeShipDateform.validate(async (valid) => {
          if (valid) {
            // Cutoff validations:
            const confirmCutoffContinue = await this.confirmCutoffContinue();
            if (!confirmCutoffContinue) { reject(false); }
            // Close previous messages and show loading
            Message.closeAll();
            const loading = this.$loading(constants.LOADING.CHANGE_SHIPDATE_CONFIG);
            // Call action to changeShipDate
            try {
              const response = await this.$store.dispatch('orderEntry/changeShipDate', this.changeShipDateform.newShipDate);
              this.$message({
                dangerouslyUseHTMLString: true,
                type: 'success',
                message: this.$t('warehouse.orderEntry.changeShipDateShipmentsMoved')
                  .replace('[totalShipmentsMoved]', response.data.total)
                  .replace('[shipDate]', moment(this.changeShipDateform.newShipDate, constants.DATES.DEFAULT_BACKEND_FORMAT).format(constants.DATES.DEFAULT_DISPLAY_FORMAT))
              });
              this.dialogVisible = false;
              this.$store.dispatch('orderEntry/search', {});
              resolve(response);
            } catch (error) {
              reject(error);
            } finally {
              loading.close();
            }
          } else {
            reject(new Error(this.$t('common.invalid')));
          }
        });
      });
    },
    isVisible() {
      const hasChangeShipDatePermission = this.$can(this.permissions.DATA_ENTRY.CHANGE_SHIP_DATE);
      return this.hasOrderConsolidations && hasChangeShipDatePermission;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
#btn-change-ship-date {
  color: #008d00;
}

.text-align-end {
  text-align: end;
}
</style>
