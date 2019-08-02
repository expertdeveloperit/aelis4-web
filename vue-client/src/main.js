import Vue from 'vue';
import 'element-ui/lib/theme-chalk/display.css';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import '@fortawesome/fontawesome-free/css/all.min.css';
import ElementUI from 'element-ui';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueMoment from 'vue-moment';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import '@/styles/index.scss'; // global css
import VueSVGIcon from 'vue-svgicon';
import i18n from './lang';
import App from './App';
import router from './router';
import store from './store';
import alphanumericValidation from './directives/alphanumericValidation';
import numericValidation from './directives/numericValidation';
import circularTabNavigationDialog from './directives/circularTabNavigationDialog';
import AuthPlugin from './plugins/auth';
import PermissionsPlugin from './plugins/permissions';
import '@/assets/compiled-icons/';

Vue.use(VueSVGIcon);

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

Vue.use(AuthPlugin);
Vue.use(PermissionsPlugin);
Vue.use(VueMoment);
Vue.directive('alphanumeric-validation', alphanumericValidation);
Vue.directive('numeric-validation', numericValidation);
Vue.directive('circular-tab-navigation-dialog', circularTabNavigationDialog);
Vue.component(VueCountdown.name, VueCountdown);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
