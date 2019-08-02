<template>
  <div class="no-user-config-container">
    <el-row :gutter="10" class="welcome-container">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="text">
          <div class="title">{{ $t('noUserConfig.welcome') }}</div>
          <div class="explanation">{{ $t('noUserConfig.explanation') }}</div>
      </el-col>
      <el-col :md="12" :lg="12" :xl="12" class="hidden-sm-and-down">
          <img class="img-trucks" src="@/assets/general_images/armellini_no_config.svg" />
      </el-col>
      <img class="corner corner-bottom" src="@/assets/general_images/border_corners.png">
      <img class="corner corner-top" src="@/assets/general_images/border_corners.png">
      <span class="corner-armellini">
        <img class="aelis-logo" src="@/assets/logos/Aelis4-logo-dark.png" alt="Aelis4">
        <img class="armellini-logo" src="@/assets/logos/Armellini.png" alt="Armellini">
      </span>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.no-user-config-container {
    margin: 90px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .welcome-container {
      background-color: #FFFFFF;
      border-radius: 10px;
      width: 100%;
      box-shadow: 10px 10px 20px 4px #bebdbd;
      .text {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        height: 100%;
        .title {
          color: #00335B;
          font-size: 80px;
          font-weight: bold;
          text-align: center;
          border-bottom: 5px solid #ED1C25;
          width: 80%;
        }
        .explanation {
          color: #575757;
          font-weight: bold;
          font-size: 18px;
          width: 65%;
          text-align: center;
          margin-top: 10px;
        }
      }

      .img-trucks {
        width: 80%;
        margin: 10% 0px;
      }
      .corner {
        width: 35%;
        position: absolute;
        border-radius: 10px;
        &-bottom {
          left: -1px;
          bottom: 0px;
        }
        &-top {
          right: 0px;
          top: 0px;
          transform: rotate(180deg);
        }
        &-armellini {
          right: 0px;
          bottom: 0px;
          color: #01355F;
          position: absolute;
          padding: 20px 30px;
          .armellini-logo {
            height: 30px;
            padding-left: 15px;
          }
          .aelis-logo {
            height: 30px;
            padding-right: 15px;
            border-right: 2px solid;
          }
        }
      }
    }
}
</style>
