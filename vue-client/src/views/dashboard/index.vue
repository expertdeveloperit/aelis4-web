<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> {{ $t('dashboard.name') }}: {{ user.name }}</div>
    <div class="dashboard-text"> {{ $t('dashboard.roles') }}: <span v-for="role in user.roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'user'
    ])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
