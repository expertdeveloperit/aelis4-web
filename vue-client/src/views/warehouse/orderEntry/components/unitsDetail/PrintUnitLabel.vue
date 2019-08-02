<template>
  <span>
    <i class="el-icon-printer icon-action print-unit-label" @click="print" :class="{ 'reprint-icon-unit': labelPrinted }" ></i>
  </span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    unitId: {
      type: String,
      default: null
    },
    labelPrinted: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    print() {
      this.$store.dispatch('orderEntry/printUnit', this.unitId);
      this.$emit('update:labelPrinted', true);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.print-unit-label {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
