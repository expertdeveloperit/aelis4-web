<template>
<span v-if="isVisible()">
    <el-button id="btn-finalize" class="button-finalize" type="success" plain @click="handleFinalize" size="mini">{{ $t('warehouse.orderEntry.finalizeShipments') }}</el-button>
</span>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';

export default {
  computed: {
    ...mapGetters([
      'orderEntry'
    ])
  },
  data() {
    return {};
  },
  methods: {
    async handleFinalize() {
      const confirm = await this.$confirm(this.$t('warehouse.orderEntry.finalizeConfirmation'), { confirmButtonText: this.$t('common.yes') });
      if (confirm) {
        const loading = this.$loading(constants.LOADING.FINALIZE_CONFIG);
        try {
          const response = await this.$store.dispatch('orderEntry/finalize');
          this.$message.success(response.message);
          await this.$store.dispatch('orderEntry/search', {});
        } finally {
          loading.close();
        }
      }
    },
    isVisible() {
      const hasOrderConsolidatios = this.orderEntry.list && this.orderEntry.list.length > 0;
      const hasFinalizePermission = this.$can(this.permissions.DATA_ENTRY.FINALIZE_AFTER_CUTOFF) || this.$can(this.permissions.DATA_ENTRY.FINALIZE_BEFORE_CUTOFF);
      return hasOrderConsolidatios && hasFinalizePermission;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.button-finalize {
  margin-right: 10px;
}
</style>
