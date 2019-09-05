<template>
<span v-show="hasOrderConsolidations">
    <el-link id="btn-print-massive" class="button-print-massive" @click="handlePrint" size="mini" :underline="false">{{ $t('warehouse.orderEntry.printLabels') }}</el-link>
</span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'hasOrderConsolidations'
    ])
  },
  data() {
    return {};
  },
  methods: {
    async handlePrint() {
      await this.$store.dispatch('orderEntry/printLabelsMassive');
      await this.$store.dispatch('orderEntry/search', {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
#btn-print-massive {
  color: #008d00;
}
</style>
