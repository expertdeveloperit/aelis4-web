<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="sidebar-title-container">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <img src="@/assets/logos/Aelis4.png" alt="Aelis4" class="pic-aelis4-logo">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#00335B"
      text-color="rgba(255,255,255, 0.5)"
      active-text-color="#FFFFFF"
      class="el-menu-container"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import Hamburger from '@/components/Hamburger';

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sidebar-title-container {
  height: 56px;
  background-color: #00335b;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  z-index: 2;
  width: 100%;
}
.hamburger-container {
  line-height: 58px;
  height: 40px;
  float: left;
  color: rgb(191, 203, 217);
  margin-left: 20px;
}
.pic-aelis4-logo {
  height: 35px;
  padding-bottom: 6px;
  padding-left: 65px;
  cursor: initial;
  margin-top: 11px;
}
.el-menu-container {
  padding-top: 56px;
}
</style>
