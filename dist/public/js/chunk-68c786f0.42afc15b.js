(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68c786f0"],{3942:function(e,s,t){e.exports=t.p+"img/border_corners.41a3f73a.png"},"6e28":function(e,s,t){e.exports=t.p+"img/Aelis4-logo-dark.1ce54e9e.png"},"9c53":function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("div",[e.user.successfullyCreatedUser?r("div",{staticClass:"sign-up-success-container"},[r("el-row",{staticClass:"welcome-container",attrs:{gutter:10}},[r("el-col",{staticClass:"text",attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[r("div",{staticClass:"title"},[e._v(e._s(e.$t("signUp.thankYou")))]),r("div",{staticClass:"explanation"},[e._v(e._s(e.$t("signUp.explanation")))]),r("div",{staticClass:"explanation-fragment"},[e._v(e._s(e.$t("signUp.explanationFragment")))])]),r("el-col",{staticClass:"hidden-sm-and-down",attrs:{md:12,lg:12,xl:12}},[r("img",{staticClass:"img-trucks",attrs:{src:t("df7e")}})]),r("img",{staticClass:"corner corner-bottom",attrs:{src:t("3942")}}),r("img",{staticClass:"corner corner-top",attrs:{src:t("3942")}}),r("span",{staticClass:"corner-armellini"},[r("img",{staticClass:"aelis-logo",attrs:{src:t("6e28"),alt:"Aelis4"}}),r("img",{staticClass:"armellini-logo",attrs:{src:t("9e2f"),alt:"Armellini"}})])],1)],1):r("div",{staticClass:"sign-up-form-container"},[r("div",{staticClass:"hidden-xs dark-blue-panel hidden-sm-only hidden-xs-only"}),r("el-col",{staticClass:"login-box",attrs:{xs:{span:20,offset:2},sm:{span:12,offset:4},md:{span:8,offset:12},lg:{span:8,offset:12}}},[r("div",{staticClass:"login-header"},[r("img",{attrs:{src:"https://s3.amazonaws.com/aelis4-assets-auth0/Armellini.png"}})]),r("div",{staticClass:"alert alert-danger",attrs:{id:"error-message"}}),r("el-form",{ref:"form",staticClass:"slidedown slideup",attrs:{model:e.form,rules:e.formRules}},[r("div",{staticClass:"form-group padding-lr-30"},[e.disabledInput.shipperAccountCode?r("el-form-item",{attrs:{prop:"shipperAccountCodeAndName"}},[r("el-input",{staticClass:"input-radius",attrs:{disabled:!0,placeholder:e.$t("signUp.placeHolders.shipperAccountCode")},model:{value:e.form.shipperAccountCodeAndName,callback:function(s){e.$set(e.form,"shipperAccountCodeAndName",s)},expression:"form.shipperAccountCodeAndName"}})],1):r("el-form-item",{attrs:{prop:"shipperAccountCode"}},[r("el-input",{staticClass:"input-radius",attrs:{id:"shipperAccountCode",maxlength:"10",placeholder:e.$t("signUp.placeHolders.shipperAccountCode")},model:{value:e.form.shipperAccountCode,callback:function(s){e.$set(e.form,"shipperAccountCode",s)},expression:"form.shipperAccountCode"}})],1)],1),r("div",{staticClass:"form-group padding-lr-30"},[r("el-form-item",{attrs:{prop:"email"}},[r("el-input",{staticClass:"input-radius",attrs:{id:"email",maxlength:"100",disabled:e.disabledInput.email,placeholder:e.$t("signUp.placeHolders.email")},model:{value:e.form.email,callback:function(s){e.$set(e.form,"email",s)},expression:"form.email"}})],1)],1),r("div",{staticClass:"form-group padding-lr-30"},[r("el-form-item",{attrs:{prop:"fullName"}},[r("el-input",{staticClass:"input-radius",attrs:{id:"fullName",maxlength:"80",placeholder:e.$t("signUp.placeHolders.fullName")},model:{value:e.form.fullName,callback:function(s){e.$set(e.form,"fullName",s)},expression:"form.fullName"}})],1)],1),r("div",{staticClass:"form-group padding-lr-30"},[r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{staticClass:"input-radius",attrs:{type:"password",id:"password",maxlength:"30",placeholder:e.$t("signUp.placeHolders.password")},model:{value:e.form.password,callback:function(s){e.$set(e.form,"password",s)},expression:"form.password"}})],1)],1),r("div",{staticClass:"form-group padding-lr-30"},[r("el-form-item",{attrs:{prop:"passwordCheck"}},[r("el-input",{staticClass:"input-radius",attrs:{type:"password",id:"password-check",maxlength:"30",placeholder:e.$t("signUp.placeHolders.passwordCheck")},model:{value:e.form.passwordCheck,callback:function(s){e.$set(e.form,"passwordCheck",s)},expression:"form.passwordCheck"}})],1)],1),r("button",{staticClass:"btn btn-block",attrs:{type:"button",id:"btn-signup"},on:{click:function(s){e.submitSignUpForm()}}},[e._v("\n                  "+e._s(e.$t("signUp.default"))+"\n              ")])])],1)],1)])},a=[],i=(t("96cf"),t("3b8d")),o=t("795b"),n=t.n(o),l=t("cebc"),c=t("2f62"),p={name:"SignUp",computed:Object(l["a"])({},Object(c["b"])(["user"])),data:function(){var e=this,s=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,t=function(t,r,a){""===r?a(new Error(e.$t("signUp.errors.passwordRequired"))):s.test(r)?(""!==e.form.passwordCheck&&e.$refs.form.validateField("passwordCheck"),a()):a(new Error(e.$t("signUp.errors.passwordTooWeak")))},r=function(s,t,r){""===t?r(new Error(e.$t("signUp.errors.passwordCheckRequired"))):t!==e.form.password?r(new Error(e.$t("signUp.errors.passwordDontMatch"))):r()};return{disabledInput:{shipperAccountCode:!0,email:!0},form:{shipperAccountCode:"",shipperAccountCodeAndName:"",email:"",fullName:"",password:"",passwordCheck:""},formRules:{password:[{validator:t,trigger:"blur"}],passwordCheck:[{validator:r,trigger:"blur"}],email:[{required:!0,message:this.$t("signUp.errors.emailRequired"),trigger:"blur"},{type:"email",message:this.$t("signUp.errors.emailValid"),trigger:"blur"}],fullName:[{required:!0,message:this.$t("signUp.errors.fullName"),trigger:"blur"}],shipperAccountCode:[{required:!0,message:this.$t("signUp.errors.shipperAccountCode"),trigger:"blur"}]}}},mounted:function(){var e=this;this.$route.query&&(this.form.shipperAccountCode=this.$route.query.shipperAccountCode,this.form.shipperAccountCodeAndName="".concat(this.$route.query.shipperAccountCode," - ").concat(this.$route.query.shipperAccountName||""),this.form.fullName=this.$route.query.fullName,this.form.email=this.$route.query.email,this.disabledInput.shipperAccountCode=!!this.form.shipperAccountCode,this.disabledInput.email=!!this.form.email),this.$nextTick(function(){e.$refs.form.$el.querySelector(":enabled:first-child").focus()})},methods:{submitSignUpForm:function(){var e=this;return new n.a(function(s,t){e.$refs.form.validate(function(){var r=Object(i["a"])(regeneratorRuntime.mark(function r(a){var i;return regeneratorRuntime.wrap(function(r){while(1)switch(r.prev=r.next){case 0:if(!a){r.next=13;break}return r.prev=1,r.next=4,e.$store.dispatch("signUp",e.form);case 4:i=r.sent,s(i),r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](1),t(r.t0);case 11:r.next=14;break;case 13:t(new Error(e.$t("common.invalid")));case 14:case"end":return r.stop()}},r,null,[[1,8]])}));return function(e){return r.apply(this,arguments)}}())})}}},d=p,u=(t("fe44"),t("2877")),m=Object(u["a"])(d,r,a,!1,null,null,null);s["default"]=m.exports},d095:function(e,s,t){},df7e:function(e,s,t){e.exports=t.p+"img/armellini_no_config.2605f2aa.svg"},fe44:function(e,s,t){"use strict";var r=t("d095"),a=t.n(r);a.a}}]);
//# sourceMappingURL=chunk-68c786f0.42afc15b.js.map