<template>
  <div>
      <!-- Sign Up Form --->
        <div class="sign-up-form-container" v-if="!user.successfullyCreatedUser">
            <div class="hidden-xs dark-blue-panel hidden-sm-only hidden-xs-only" >
            </div>
            <el-col :xs="{span: 20, offset: 2}" :sm="{span: 12, offset: 4}" :md="{span: 8, offset: 12}" :lg="{span: 8, offset: 12}" class="login-box">
            <div class="login-header">
                <img src="https://s3.amazonaws.com/aelis4-assets-auth0/Armellini.png"/>
            </div>
            <div id="error-message" class="alert alert-danger"></div>
            <el-form :model="form" :rules="formRules" ref="form" class="slidedown slideup">
                <div class="form-group padding-lr-30">
                    <el-form-item prop="shipperAccountCode" v-if="!disabledInput.shipperAccountCode">
                        <el-input v-model="form.shipperAccountCode" id="shipperAccountCode"  maxlength="10" class="input-radius" :placeholder="$t('signUp.placeHolders.shipperAccountCode')"></el-input>
                    </el-form-item>
                    <el-form-item prop="shipperAccountCodeAndName" v-else>
                        <el-input v-model="form.shipperAccountCodeAndName" :disabled="true" class="input-radius" :placeholder="$t('signUp.placeHolders.shipperAccountCode')"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group padding-lr-30">
                    <el-form-item prop="email">
                        <el-input v-model="form.email" id="email" class="input-radius" maxlength="100" :disabled="disabledInput.email"  :placeholder="$t('signUp.placeHolders.email')"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group padding-lr-30">
                    <el-form-item prop="fullName">
                        <el-input v-model="form.fullName" id="fullName" class="input-radius"  maxlength="80" :placeholder="$t('signUp.placeHolders.fullName')"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group padding-lr-30">
                    <el-form-item prop="password">
                        <el-input type="password" id="password" v-model="form.password" maxlength="30" class="input-radius"  :placeholder="$t('signUp.placeHolders.password')"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group padding-lr-30">
                    <el-form-item prop="passwordCheck">
                        <el-input type="password" id="password-check" v-model="form.passwordCheck" maxlength="30" class="input-radius"  :placeholder="$t('signUp.placeHolders.passwordCheck')"></el-input>
                    </el-form-item>
                </div>
                <button
                type="button"
                id="btn-signup"
                class="btn btn-block" @click="submitSignUpForm()" >
                    {{ $t('signUp.default') }}
                </button>
            </el-form>
            </el-col>
        </div>
        <!-- Sign Up Success --->
        <div class="sign-up-success-container" v-else>
            <el-row :gutter="10" class="welcome-container">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="text">
                <div class="title">{{ $t('signUp.thankYou') }}</div>
                <div class="explanation">{{ $t('signUp.explanation') }}</div>
                <div class="explanation-fragment">{{ $t('signUp.explanationFragment') }}</div>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data() {
    /* Custom Validators for Password */
    const expressionCheckPasswordSafety = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('signUp.errors.passwordRequired')));
      } else if (!expressionCheckPasswordSafety.test(value)) {
        callback(new Error(this.$t('signUp.errors.passwordTooWeak')));
      } else {
        if (this.form.passwordCheck !== '') {
          this.$refs.form.validateField('passwordCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('signUp.errors.passwordCheckRequired')));
      } else if (value !== this.form.password) {
        callback(new Error(this.$t('signUp.errors.passwordDontMatch')));
      } else {
        callback();
      }
    };
    return {
      disabledInput: {
        shipperAccountCode: true,
        email: true
      },
      form: {
        shipperAccountCode: '',
        shipperAccountCodeAndName: '',
        email: '',
        fullName: '',
        password: '',
        passwordCheck: ''
      },
      formRules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        passwordCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('signUp.errors.emailRequired'), trigger: 'blur' },
          { type: 'email', message: this.$t('signUp.errors.emailValid'), trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: this.$t('signUp.errors.fullName'), trigger: 'blur' }
        ],
        shipperAccountCode: [
          { required: true, message: this.$t('signUp.errors.shipperAccountCode'), trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    if (this.$route.query) {
      this.form.shipperAccountCode = this.$route.query.shipperAccountCode;
      this.form.shipperAccountCodeAndName = `${this.$route.query.shipperAccountCode} - ${this.$route.query.shipperAccountName || ''}`;
      this.form.fullName = this.$route.query.fullName;
      this.form.email = this.$route.query.email;
      // The :disabled prop of inputs element needs boolean strict.
      this.disabledInput.shipperAccountCode = !!this.form.shipperAccountCode;
      this.disabledInput.email = !!this.form.email;
    }
    this.$nextTick(() => {
      this.$refs.form.$el.querySelector(':enabled:first-child').focus();
    });
  },
  methods: {
    submitSignUpForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            try {
              const response = await this.$store.dispatch('signUp', this.form);
              resolve(response);
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error(this.$t('common.invalid')));
          }
        });
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.sign-up-form-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url("https://s3.amazonaws.com/aelis4-assets-auth0/login.JPG");
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
    font-family: Open Sans;
    .login-container {
      position: relative;
      height: 100%;
      opacity: 0;
      display: none;
      visibility: hidden;
      -webkit-transition: opacity 600ms, visibility 600ms, display 600ms;
       transition: opacity 600ms, visibility 600ms, display 600ms;
    }

    .login-box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 10px 15px 38px 15px;
      background-color: #fff;
      box-shadow: 0px 4px 4px #00000085;
      border-radius: 20px;
      border-top: 1px solid #e9e9e9;
    }

    .login-header {
      text-align: center;
    }

    .login-header img {
      width: 60%;
      padding-top: 8%;
      padding-bottom: 8%;
    }

    .dark-blue-panel {
      width: 34%;
      height: 100%;
      right: 0px;
      position: absolute;
      background-color: #00335B;
    }

    .input-radius {
        .el-input__inner {
       border-radius: 20px;
       border: solid 1px #00335B;
       height: 34px;
        &:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }
        }

    }

    .padding-lr-30 {
      padding-left: 30px;
      padding-right: 30px;
      .label-header-data {
          padding: 0px 0px 20px;
          color: #00335b;
          font-weight: 600;
      }
    }

    #btn-signup {
      margin-bottom: 7px;
      border-radius: 25px;
      background-color: #00335B;
      width: 60%;
      margin-left: 20%;
      color: #fff;
      border-color: #2e6da4;
      padding: 6px 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }
    #error-message {
      display: none;
    }
    #loading-div {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #00335B;
      z-index: 20;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
       -webkit-transition: opacity 400ms, visibility 400ms;
       transition: opacity 400ms, visibility 400ms;
    }

    .el-form-item__error {
      font-size: 10px;
      padding-top: 1px;
    }

    @keyframes slideDownKeyFrame {
      0% {
        max-height: 0px;
      }
      100% {
        max-height: 380px;
      }
    }
    .slidedown {
          max-height: 0px;
          overflow-y: hidden;
          animation: 1s ease-in 0.5s 1 slideDownKeyFrame forwards;
          margin-bottom: 10px;
     }
}
.sign-up-success-container {
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
          font-size: 20px;
          width: 65%;
          text-align: center;
          margin-top: 10px;
        }
        .explanation-fragment {
          color: #575757;
          font-size: 15px;
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
