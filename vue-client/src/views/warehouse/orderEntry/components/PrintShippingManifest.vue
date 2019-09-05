<template>
  <span v-show="hasOrderConsolidations">
    <el-link id="btn-print-shipping-manifest" @click="handlePrint" size="mini" :underline="false">{{ $t('warehouse.orderEntry.printShippingManifest') }}</el-link>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PrintShippingManifest',
  computed: {
    ...mapGetters([
      'hasOrderConsolidations'
    ])
  },
  methods: {
    async handlePrint() {
      await this.$store.dispatch('orderEntry/printShippingManifest');
      await this.$store.dispatch('orderEntry/search', {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#btn-print-shipping-manifest {
  color: #008d00;
}
</style>
