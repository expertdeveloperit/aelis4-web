<template>
  <span>
    <i class="el-icon-printer icon-action" @click="print" :class="{ 'reprint-icon-unit': labelPrinted }"></i>
  </span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    unitsConsolidateId: {
      type: Number,
      default: null
    },
    labelPrinted: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    print() {
      this.$store.dispatch('orderEntry/printUnitsConsolidate', this.unitsConsolidateId);
      this.$emit('update:labelPrinted', true);
    }
  }
};
</script>
