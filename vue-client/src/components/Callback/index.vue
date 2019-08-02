<template>
  <div class="spinner">
    <img src="@/assets/svg/loading.svg" alt="loading"/>
  </div>
</template>

<script>

export default {
  name: 'callback',
  methods: {
    handleLoginEvent(data) {
      this.$store.dispatch('setUserInfo', data.profile);
      this.$router.replace(data.state.target || '/');
    }
  },
  created() {
    this.$auth.handleAuthentication();
  }
};
</script>

<style>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
