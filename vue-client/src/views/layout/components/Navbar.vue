<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <img src="@/assets/logos/Armellini.png" alt="Armellini" class="pic-armellini-logo">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item divided>
          <span style="display:block;" @click="handleLogOut">{{ $t('navbar.logOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    handleLoginEvent(data) {
      if (!data.loggedIn) {
        this.$router.replace({ path: '/' });
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    handleLogOut() {
      this.$auth.logOut();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 56px;
  line-height: 50px;
  border-radius: 0px !important;
  box-shadow: 0px 1px 3px rgba(0,0,0, 0.16);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    display: none;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.pic-armellini-logo {
    height: 40px;
    padding-bottom: 5px;
    padding-left: 10px;
    margin-top: 10px;
}
//This hamburger container from navbar only shows on mobile divices.
@media only screen and (max-width: 1026px) {
  .navbar {
    .hamburger-container {
      display: block;
      margin-left: 10px;
    }
  }
}

</style>
