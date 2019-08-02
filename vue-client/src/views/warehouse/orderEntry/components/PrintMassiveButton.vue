<template>
<span v-if="orderEntry.list && orderEntry.list.length > 0">
    <el-button id="btn-print-massive" class="button-print-massive" type="success" plain @click="handlePrint" size="mini">{{ $t('warehouse.orderEntry.printLabels') }}</el-button>
</span>
</template>

<script>
import { mapGetters } from 'vuex';

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
    async handlePrint() {
      await this.$store.dispatch('orderEntry/printLabelsMassive');
      await this.$store.dispatch('orderEntry/search', {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.button-print-massive {
  margin-right: 10px;
}
</style>
